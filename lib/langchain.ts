import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
});

export const indexName = "docsmart";

async function fetchMessagesFromDB(docId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  console.log("fetch chat history");
  const LIMIT = 30;

  const chats = await adminDb.collection("users").doc(userId).collection("files").doc(docId).collection("chat").orderBy("createdAt", "desc").limit(LIMIT).get();

  const chatHistory = chats.docs.map((doc) => {
    doc.data().role === "human" ? new HumanMessage(doc.data().message) : new AIMessage(doc.data().message);
  });

  console.log("fetched last");

  return chatHistory;
}

export async function generateDocs(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  console.log("fetching the download url from firebase");

  const firebaseRef = await adminDb.collection("users").doc(userId).collection("files").doc(docId).get();

  const downloadUrl = firebaseRef.data()?.downloadUrl;

  if (!downloadUrl) {
    throw new Error("Download url not found");
  }

  const response = await fetch(downloadUrl);

  const data = await response.blob();

  console.log("loading PDF");
  const loader = new PDFLoader(data);
  const docs = await loader.load();

  console.log("splitting the document into smaller parts");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`split into ${splitDocs.length} parts`);

  return splitDocs;
}

async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
  if (namespace === null) throw new Error("No namespace provided");

  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
}

let pineconeVectorStore;

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  console.log("generating embeddings");

  const embeddings = new OpenAIEmbeddings();

  const index = await pineconeClient.Index(indexName);

  const namespaceAlreadyExists = await namespaceExists(index, userId);

  if (namespaceAlreadyExists) {
    console.log("Namespace already exists reuse existing embedding");

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  } else {
    const splitDocs = await generateDocs(docId);

    console.log(`storing the embeddings in namespace ${docId} in the ${indexName} Pincone vector store`);

    pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  }
}

export async function generateLangchainCompletion(docId: string, question: string) {
  let pineconeVectorStore;

  pineconeVectorStore = await generateEmbeddingsInPineconeVectorStore(docId);

  console.log("creating reciever");

  if (!pineconeVectorStore) {
    throw new Error("Pinecone vector");
  }

  const retriver = pineconeVectorStore.asRetriever();

  const chatHistory = await fetchMessagesFromDB(docId);
  console.log("define prompt temp");
}
