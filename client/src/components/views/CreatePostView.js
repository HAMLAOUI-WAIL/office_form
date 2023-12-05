import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";
import FindUsers from "../FindUsers";

const CreatePostView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout
        left={<FindUsers />}
        middle={<PostEditor />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default CreatePostView;
