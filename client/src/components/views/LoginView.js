import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import ErrorAlert from "../ErrorAlert";
import Copyright from "../Copyright";
import logo from "../logo.png";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  };

  const textFieldStyle = {
    margin: "10px 0",
    width: "100%",
  };

  const buttonStyle = {
    margin: "20px 0",
    padding: "10px",
    backgroundColor: "#2196f3",
    color: "#fff",
    borderRadius: "4px",
    fontWeight: "bold",
  };

  const signUpLinkStyle = {
    marginTop: "10px",
    color: "#2196f3",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="primary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            <img src={logo} alt="Logo" />
          </Link>
        </Typography>
        <Box style={formContainerStyle}>
          <Typography variant="h5" gutterBottom color="primary">
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              style={textFieldStyle}
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
            />
            <TextField
              style={textFieldStyle}
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
            />
            <ErrorAlert error={serverError} />
            <Button type="submit" fullWidth variant="contained" style={buttonStyle}>
              Login
            </Button>
          </form>
          <Typography style={signUpLinkStyle}>
            Don't have an account yet?{" "}
            <Link to="/signup" style={signUpLinkStyle}>
              Sign Up
            </Link>
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginView;
