import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserAvatar from "./UserAvatar";

import moment from "moment";

const UserMessengerEntry = (props) => {
  const recipient = props.conversation.recipient;
  const username = recipient.username;
  const selected =
    props.conservant && props.conservant.username === recipient.username;

  const handleClick = () => {
    props.setConservant(recipient);
  };
  const secondaryitemstyle = {
    backgroundColor: "#b8b7b4",
    borderRadius: "50px",
    borderBottom: "1px solid #000000",
  };
  return (
    <>
      <MenuItem
        style={secondaryitemstyle}
        onClick={handleClick}
        sx={{ padding: 2 }}
        divider
        disableGutters
        selected={selected}
      >
        <ListItemAvatar>
          <UserAvatar height={45} width={45} username={username} />
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={moment(props.conversation.lastMessageAt).fromNow()}
        />
      </MenuItem>
    </>
  );
};

export default UserMessengerEntry;
