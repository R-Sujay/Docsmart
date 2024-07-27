import React from "react";
import PlaceholderDocument from "./PlaceholderDocument";
import { adminDb } from "@/firebaseAdmin";
import Document from "./Document";
import { auth } from "@clerk/nextjs/server";

type Props = {
  documentsSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
};

async function Documents({ documentsSnapshot }: Props) {
  return (
    <div className="flex flex-wrap p-5 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      <PlaceholderDocument />

      {documentsSnapshot.docs.map((doc) => {
        const { name, downloadUrl, size } = doc.data();

        return <Document key={doc.id} id={doc.id} name={name} downloadUrl={downloadUrl} size={size} />;
      })}
    </div>
  );
}

export default Documents;
