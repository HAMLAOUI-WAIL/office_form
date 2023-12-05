import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import PostCard from "./PostCard";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";

const TopPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const user = isLoggedIn();

  const fetchPosts = async () => {
    const query = { sortBy: "-likeCount" };

    const data = await getPosts(user && user.token, query);

    const topPosts = [];

    if (data && data.data) {
      for (let i = 0; i < 3 && i < data.data.length; i++) {
        topPosts.push(data.data[i]);
      }
    }

    setPosts(topPosts);

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
  };
  return (
    <Stack spacing={2}>
      <Card style={ItemStyle}>
        <HorizontalStack>
          <MdLeaderboard color={"white"} />
          <Typography color={"white"}>Top Posts</Typography>
        </HorizontalStack>
      </Card>
      {!loading ? (
        posts &&
        posts.map((post) => (
          <PostCard preview="secondary" post={post} key={post._id} />
        ))
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopPosts;
