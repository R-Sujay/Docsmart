import React from "react";
import { Message } from "./Chat";
import { BotIcon, Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import TimeAgo from "timeago-react";
import Markdown from "react-markdown";

const ChatMessage = ({ message }: { message: Message }) => {
  // Sort messages by time in descending order
  const isHuman = message.role === "human";
  const { user } = useUser();

  return (
    <div className={`flex items-start ${isHuman ? "justify-end" : "justify-start"} gap-2.5 pb-11`}>
      {!isHuman && (
        <div className="h-10 w-10 rounded-full bg-[#758bfd] flex items-center justify-center">
          <BotIcon className="text-white h-7 w-7" />
        </div>
      )}
      <div className="grid">
        <h5 className={`pb-1 text-sm font-semibold leading-snug ${isHuman ? "text-right" : "text-left"} text-white`}>{isHuman ? "You" : "DOCSMART"}</h5>
        <div className="grid w-max">
          <div className={`inline-flex items-center max-w-lg ${isHuman ? "justify-end" : "justify-start"} gap-3 rounded ${isHuman ? "bg-[#1c2541] text-white" : "bg-[#1c2541] text-white"} px-3.5 py-2`}>
            <h5 className="text-sm font-normal leading-snug">
              {message.message === "Thinking..." ? (
                <div className="flex items-center justify-center">
                  <Loader2Icon className="animate-spin h-5 w-5 text-black" />
                </div>
              ) : (
                <Markdown>{message.message}</Markdown>
              )}
            </h5>
          </div>
          <div className={`inline-flex items-center ${isHuman ? "justify-end" : "justify-start"} mb-2.5`}>
            <h6 className="py-1 text-xs font-normal leading-4 text-gray-500">
              <TimeAgo datetime={message.createdAt.toLocaleString()} locale="en_US" />
            </h6>
          </div>
        </div>
      </div>
      {isHuman && <img src={user?.imageUrl} alt="User image" className="h-11 w-10 rounded-full" />}
    </div>
  );
};

export default ChatMessage;
