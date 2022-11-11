import { useEffect, useState } from "react";
import Message from "../messages";
import { io } from "socket.io-client";

let socket;
export default function Chat() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    socket = io().connect("http://localhost:8080");
  }, []);

  return (
    <>
      <div
        onClick={() => setShowChat(true)}
        className="z-10 chat-container cursor-pointer bg-slate-700 fixed right-8 bottom-10 w-14 h-14 rounded-full grid place-content-center shadow-md shadow-slate-800 scale-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 stroke-violet-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      {showChat && (
        <Message
          handleShowChat={setShowChat}
          socket={socket}
          showChat={showChat}
        />
      )}
    </>
  );
}
