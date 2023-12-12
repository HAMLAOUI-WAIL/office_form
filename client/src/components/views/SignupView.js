import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  Paper
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";
import logo from "../logo.png";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must contain only valid characters";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
  };
  const signUpLinkStyle = {
    marginTop: "10px",
    color: "#2196f3",
    textDecoration: "none",
    fontWeight: "bold",
  };
  return (
    <Container
  maxWidth={"xs"}
  sx={{ mt: 6 }}
>
  <Stack alignItems="center">
    <Link to="/" color="inherit" underline="none">
      <img src={logo} alt="Logo" style={{ marginBottom: "20px" }} />
    </Link>
    
    <Box
      component={Paper}
      elevation={3}
      sx={{
        mt: 6,
        backgroundColor: "#ffffff",
        color: "#2196f3",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom color="#2196f3">
        Sign Up
      </Typography>
      <Typography color="#333333" mb={2}>
        Already have an account?{" "}
        <Link to="/login" style={signUpLinkStyle}>
              Login
         </Link>
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        autoFocus
        required
        id="username"
        name="username"
        onChange={handleChange}
        error={errors.username !== undefined}
        helperText={errors.username}
      />
      <TextField
        label="Email Address"
        fullWidth
        margin="normal"
        autoComplete="email"
        required
        id="email"
        name="email"
        onChange={handleChange}
        error={errors.email !== undefined}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        fullWidth
        required
        margin="normal"
        autoComplete="new-password"
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        error={errors.password !== undefined}
        helperText={errors.password}
      />
      <ErrorAlert error={serverError} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#2196f3", color: "#ffffff" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>

    <Box sx={{ mt: 3 }}>
      <Copyright />
    </Box>
  </Stack>
</Container>

  );
};

export default SignupView;
