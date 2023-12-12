import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../config";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const isMounted = useRef(false);
  const bubbleContainerRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get(API_ENDPOINT);
        const botMessage = { content: response.data.content, role: "assistant" };
        setMessages([...messages, botMessage]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const scrollToBottom = () => {
    if (bubbleContainerRef.current) {
      bubbleContainerRef.current.scrollTop = bubbleContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== '') {
      const usrMessage = { content: input, role: "user" };
      setMessages([...messages, usrMessage]);
      setInput('');

      try {
        setLoad(true);
        const response = await axios.post(API_ENDPOINT, { message: input });
        const botMessage = { content: response.data.content, role: "assistant" };
        setMessages(messages => [...messages, botMessage]);
      } catch (error) {
        console.error('Error sending/receiving message:', error);
      }

      setLoad(false);
      scrollToBottom();
    }
  };

  const chatContainerStyle = {
    position: "fixed",
    bottom: showChat ? "20px" : "-300px",
    right: "20px",
    transition: "bottom 0.3s ease-in-out",
    zIndex: 1000,
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    
      <div>
        <button
          style={{
            backgroundColor: "#2196f3",
            color: "#fff",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 2,
          }}
          onClick={toggleChat}
        >
          {showChat ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
        {showChat && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
              onClick={toggleChat}
            ></div>
            <div
              style={{
                backgroundColor: "#263238",
                borderRadius: "10px",
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 2,
              }}
            >
              <header
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                  color: "#2196f3",
                }}
              >
                <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Chatbot</h1>
              </header>
              {/* Chat content goes here */}
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      maxWidth: "70%",
                      padding: "8px",
                      margin: "4px",
                      borderRadius: "8px",
                      wordBreak: "break-word",
                      fontSize: "16px",
                      backgroundColor:
                        message.role === "user" ? "#fff" : "#2196f3",
                      color: message.role === "user" ? "#000" : "#fff",
                    }}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", padding: "10px" }}>
                <textarea
                  placeholder="Type your message..."
                  rows="3"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    resize: "none",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    marginRight: "8px",
                  }}
                ></textarea>
                <button
                  onClick={sendMessage}
                  style={{
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  disabled={load}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default ChatBot;
