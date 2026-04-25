import React, { useState, useRef, useEffect } from "react";
import { getBotReply } from "../../ChatBot/chatbotBrain"; // your logic file

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 Ask me anything about Aditya's profile." }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const botMsg = { role: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    <br/><br/><br/>
    
    <div className="max-w-xl mx-auto h-[80vh]   flex flex-col border border-gray-200 rounded-2xl shadow-sm bg-white">
      
      {/* Header */}
      <div className="px-4 py-3 border-b text-sm font-medium text-gray-700">
        AdiBot 🤖
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 text-sm rounded-xl ${
                m.role === "user"
                  ? "bg-black text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-700 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, experience..."
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
}