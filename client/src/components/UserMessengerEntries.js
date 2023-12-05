import { Box, Divider, List, Stack, Typography } from "@mui/material";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import Loading from "./Loading";
import UserMessengerEntry from "./UserMessengerEntry";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/bi";
import { BiSad } from "react-icons/bi";

const UserMessengerEntries = (props) => {
  const ItemStyle = {
    backgroundColor: "#424242",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
  };
  const messageStyle = {
    color: "white",
  };
  return !props.loading ? (
    <>
      {props.conversations.length > 0 ? (
        <Stack style={ItemStyle}>
          <HorizontalStack
            alignItems="center"
            spacing={2}
            sx={{ px: 2, height: "60px" }}
          >
            <AiFillMessage size={30} color={"white"} />
            <Typography color={"white"}>
              <b>Your Conversations</b>
            </Typography>
          </HorizontalStack>
          <Divider />
          <Box sx={{ height: "calc(100vh - 171px)" }}>
            <Box sx={{ height: "100%" }}>
              <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" }}>
                {props.conversations.map((conversation) => (
                  <UserMessengerEntry
                    conservant={props.conservant}
                    conversation={conversation}
                    key={conversation.recipient.username}
                    setConservant={props.setConservant}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Stack
          sx={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          textAlign="center"
          style={ItemStyle}
        >
          <BiSad size={60} color="white" />
          <Typography variant="h5" color={"white"}>
            No Conversations
          </Typography>
          <Typography color="white" sx={{ maxWidth: "70%" }}>
            Click 'Message' on another user's profile to start a conversation
          </Typography>
        </Stack>
      )}
    </>
  ) : (
    <Stack sx={{ height: "100%" }} justifyContent="center">
      <Loading />
    </Stack>
  );
};

export default UserMessengerEntries;
