import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import UserEntry from "./UserEntry";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };
  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
  };

  return (
    <Stack spacing={3}>
      <Card style={ItemStyle}>
        <Stack spacing={2} color={"white"}>
          <HorizontalStack justifyContent="space-between">
            <HorizontalStack>
              <AiOutlineUser />
              <Typography>Find Others</Typography>
            </HorizontalStack>
            <IconButton
              sx={{ padding: 0 }}
              disabled={loading}
              onClick={handleClick}
            >
              <MdRefresh color={"white"} />
            </IconButton>
          </HorizontalStack>

          <Divider />

          {loading ? (
            <Loading />
          ) : (
            users &&
            users.map((user) => (
              <UserEntry username={user.username} key={user.username} />
            ))
          )}
        </Stack>
      </Card>
      <ChatBot />
    </Stack>
  );
};

export default FindUsers;
