import { useEffect, useState, useRef } from "react";
import "./style.css";

let num = 0;

export default function Message({ handleShowChat, socket, showChat }) {
  const [Message, setMessage] = useState({ sendBy: "user", message: "" });
  const [chatMessages, setChatMessages] = useState([]);

  const scrollDiv = useRef();
  const msgClient = num < 3 ? `msg-client${num}` : "msg-client3";

  const sendMsg = (userMessage) => {
    socket.emit(msgClient, userMessage);
    num++;

    setTimeout(() => {
      scrollDiv.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 100);
  };

  const handleClick = () => {
    setMessage({ sendBy: "user", message: "" });
    sendMsg(Message);
    setChatMessages((prev) => [...prev, Message]);
  };

  const handleChange = (e) => {
    let msg = e.target.value;
    setMessage((prev) => ({ ...prev, message: msg }));
  };

  const handleResetChat = () => {
    handleShowChat(false);
    num = 0;
  };

  useEffect(() => {
    if (socket?.connected === false) {
      socket.connect("http://localhost:8080");
    }

    socket.emit("initial-client", { nombre: "daniel" });

    socket.on("initial-server", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });
    socket.on("msg-server", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 w-80 h-[470px] right-10  shadow-lg  z-10 rounded-2xl overflow-hidden translate-y-10 opacity-0 ${
        showChat ? "active" : ""
      }`}
    >
      <div className="bg-white w-full h-full">
        <div className="bg-violet-600 p-3 flex justify-between">
          <h1 className="font-semibold text-base text-white">Live CHAT</h1>
          <span
            onClick={handleResetChat}
            className="text-white font-bold block pr-3 cursor-pointer"
          >
            X
          </span>
        </div>

        <div className="messages h-3/4 text-[14px] overflow-y-auto px-8 mb-6">
          {chatMessages.map((msg) => {
            return (
              <div key={msg.message} className="mb-5">
                <p
                  className={`text-purple-500 font-bold text-base ${
                    msg.sendBy === "server"
                      ? "text-left text-purple-500 "
                      : "text-right"
                  }`}
                >
                  {msg.sendBy}{" "}
                </p>
                <p
                  className={`whitespace-pre-wrap ${
                    msg.sendBy === "user"
                      ? "text-right bg-indigo-500 text-white w-max ml-auto px-5 py-1 rounded-lg"
                      : "text-left bg-slate-50 p-2 shadow-md rounded-md"
                  }`}
                >
                  {msg.message}
                </p>
              </div>
            );
          })}
          <div ref={scrollDiv}></div>
        </div>

        <div className="flex h-8 w-5/6 m-auto shadow-md rounded-tl-lg rounded-bl-lg overflow-hidden">
          <input
            type="text"
            name="message"
            id="message"
            autoFocus
            className="outline-none pl-3 w-[65%] text-sm"
            placeholder="your message..."
            onChange={handleChange}
            value={Message.message}
          />
          <button
            onClick={handleClick}
            className=" bg-violet-600 flex-grow text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
