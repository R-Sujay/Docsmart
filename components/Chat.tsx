"use client";

import { useUser } from "@clerk/nextjs";
import React, { FormEvent, use, useEffect, useRef, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2Icon, SendHorizontal } from "lucide-react";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { askQuestion } from "@/actions/askQuestion";
import ChatMessage from "./ChatMessage";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};

function Chat({ id }: { id: string }) {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const [snapshot, loading, error] = useCollection(user && query(collection(db, "users", user?.id, "files", id, "chat"), orderBy("createdAt", "asc")));

  useEffect(() => {
    if (!snapshot) return;

    console.log("update", snapshot.docs);
    const lastMessage = messages.pop();

    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
      return;
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();

      return {
        id: doc.id,
        role,
        message,
        createdAt: createdAt.toDate(),
      };
    });

    setMessages(newMessages);
  }, [snapshot]);

  useEffect(() => {
    bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = input;

    setInput("");

    setMessages((prev) => [...prev, { role: "human", message: q, createdAt: new Date() }, { role: "ai", message: "Thinking...", createdAt: new Date() }]);

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      if (!success) {
        setMessages((prev) => prev.slice(0, prev.length - 1).concat([{ role: "ai", message: `Whoops... ${message}`, createdAt: new Date() }]));
      }
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-scroll">
      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-20 w-20 text-indigo-600 mt-20" />
          </div>
        ) : (
          <div className="p-5">
            {messages.length === 0 && <ChatMessage key="placeholder" message={{ role: "ai", message: "Ask me anything about the document!", createdAt: new Date() }} />}

            {messages.map((messages, index) => (
              <ChatMessage key={index} message={messages} />
            ))}

            <div ref={bottomOfChatRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex sticky bottom-0 space-x-2 p-5 bg-[#1c2541]">
        <Input placeholder="Ask a Question..." value={input} onChange={(e) => setInput(e.target.value)} className="bg-[#3a506b] border-0" />

        <Button type="submit" disabled={!input || isPending} className="bg-black text-white">
          {isPending ? <Loader2Icon className="animate-spin text-indigo-600" /> : <SendHorizontal className="text-white" />}
        </Button>
      </form>
    </div>
  );
}

export default Chat;
