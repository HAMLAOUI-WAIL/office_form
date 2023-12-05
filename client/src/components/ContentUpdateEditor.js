import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };
  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
    color: "white",
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={ItemStyle}>
      <Stack>
        <TextField
          value={content}
          fullWidth
          margin="normal"
          name="content"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "white", mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default ContentUpdateEditor;
