import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import Chat from "./views/Chat";

const ChatBot = () => {
  const ItemStyle = {
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    borderBottom: "1px solid #46C2CB",
  };
  // .App-header {
  //   background-color: #282c34;
  //   min-height: 100vh;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   font-size: calc(10px + 2vmin);
  //   color: white;
  // }
  return (
    
    <header className="App-header">
      <h1>Chatbot</h1>
      <Chat />
    </header>
  
  );
};

export default ChatBot;
