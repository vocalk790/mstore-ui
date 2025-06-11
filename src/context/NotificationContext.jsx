// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const push = (text, type = "info", timeout = 4000) => {
    const id = Date.now();
    const newMsg = { id, text, type };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, timeout);
  };

  return (
    <NotificationContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-6 right-6 space-y-2 z-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-4 py-2 rounded-lg shadow text-white text-sm ${
              msg.type === "error"
                ? "bg-red-500"
                : msg.type === "success"
                ? "bg-green-500"
                : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
