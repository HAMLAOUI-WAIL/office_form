import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import Chat from "./views/Chat";

const ChatBot = () => {
  // const ItemStyle = {
  //   backgroundColor: "#e0e0e0",
  //   borderRadius: "10px",
  //   borderBottom: "1px solid #46C2CB",
  // };
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
  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
    color: "white",
  };
  return (
    
    <Box style={ItemStyle} spacing={3}>
      <header className="App-header">
        <h1>Chatbot</h1>
        <Chat />
      </header>
    </Box>
  
  );
};

export default ChatBot;
