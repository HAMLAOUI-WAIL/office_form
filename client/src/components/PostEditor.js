import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };
  const ItemStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
    color: "white",
  };
  const inputStyle = {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#595352",
  };
  const labelStyle = {
    color: "white",
  };
  const buttonStyle = {
    color: "white",
    backgroundColor: "#595352",
  };
  return (
    <Card style={ItemStyle}>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to post today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            style={inputStyle}
            fullWidth
            label="Title"
            InputProps={{
              style: inputStyle,
            }}
            InputLabelProps={{
              style: labelStyle,
            }}
            required
            name="title"
            backgroundColor="white"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Content"
            InputProps={{
              style: inputStyle,
            }}
            InputLabelProps={{
              style: labelStyle,
            }}
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            Width="30%"
            style={buttonStyle}
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
