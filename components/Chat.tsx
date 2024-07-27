"use client";

import { useUser } from "@clerk/nextjs";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";

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

  const [snapshot, loading, error] = useCollection(user && query(collection(db, "users", user?.id, "files", id, "chat"), orderBy("createdAt", "asc")));

  useEffect(() => {
    if (!snapshot) return;

    console.log("update", snapshot.docs);
    // const lastMessage = messages.pop()
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // const q = input;

    setInput(``);

    // // setMessages((prev) => [...prev, { role: "human", message: q, createdAt: new Date() }, { role: "ai", message: "Thinking...", createdAt: new Date() }]);

    // // // startTransition(async () => {
    // // //   const { success, message } = await askQuestion(id, q);

    // // //   if (!success) {
    // // //     setMessages((prev) => prev.slice(0, prev.length - 1).concat([{ role: "ai", message: `Whoops... ${message}`, createdAt: new Date() }]));
    // // //   }
    // // // });
  };

  return (
    <div className="flex flex-col h-full overflow-scroll">
      <div className="flex-1 w-full"></div>

      <form onSubmit={handleSubmit} className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75">
        <Input placeholder="Ask a Question..." value={input} onChange={(e) => setInput(e.target.value)} />

        <Button type="submit" disabled={!input || isPending}>
          {isPending ? <Loader2Icon className="animate-spin text-indigo-600" /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}

export default Chat;
