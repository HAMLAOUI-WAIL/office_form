import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IoArrowRedoSharp } from "react-icons/io5";

const UserEntry = ({ username }) => {
  return (
    <HorizontalStack justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={30} height={30} username={username} />
        <Typography color={"white"}>{username}</Typography>
      </HorizontalStack>
      <Link to={"/users/" + username}>
        <IoArrowRedoSharp color="white" />
      </Link>
    </HorizontalStack>
  );
};

export default UserEntry;
