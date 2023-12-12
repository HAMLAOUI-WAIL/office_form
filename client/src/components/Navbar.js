import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiFillHome,
  AiFillMessage,
} from "react-icons/ai";
import { RiContrast2Line } from "react-icons/ri";
import logo from "./logo.png";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = () => {
    setSearchIcon(!searchIcon);
  };

  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
    padding: "10px",
  };

  const searchStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
  };

  return (
    <Stack
      mb={2}
      mt={2}
      sx={ItemStyle}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <img
            src={logo}
            alt="Logo"
            width="200"
            height="40"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </HorizontalStack>
        {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              style={searchStyle}
              textColor={"white"}
              size="small"
              label="Search for posts..."
              sx={{ flexGrow: 1, maxWidth: 300 }}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}
        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch color={"white"} />
            </IconButton>
          )}

          <IconButton component={Link} to={"/"} sx={{ color: "white" }}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"} sx={{ color: "white" }}>
                <AiFillMessage />
              </IconButton>
              <IconButton component={Link} to={"/users/" + username} sx={{ color: "white" }}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout} style={searchStyle}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ minWidth: 80 }} href="/signup" style={searchStyle}>
                Sign Up
              </Button>
              <Button variant="text" sx={{ minWidth: 60 }} href="/login" style={searchStyle}>
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            color={"white"}
            size="small"
            label="Search for posts..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
