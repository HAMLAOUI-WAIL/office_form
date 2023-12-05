import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);
  const componentStyle = {
    backgroundColor: "#2D033B",
  };

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

  const handleLogout = async (e) => {
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

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };
  const ItemStyle = {
    backgroundColor: "#262525",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
    border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #888888",
  };
  const searchStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    borderBottom: "1px solid #000000",
  };

  return (
    <Stack mb={2} mt={2} style={ItemStyle}>
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
            size={33}
            onClick={() => navigate("/")}
            width="200"
            height="40"
          ></img>
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

          <IconButton component={Link} to={"/"}>
            <AiFillHome color={"white"} />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"}>
                <AiFillMessage color={"white"} />
              </IconButton>
              <IconButton component={Link} to={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout} style={searchStyle}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="text"
                sx={{ minWidth: 80 }}
                href="/signup"
                style={searchStyle}
              >
                Sign Up
              </Button>
              <Button
                variant="text"
                sx={{ minWidth: 60 }}
                href="/login"
                style={searchStyle}
              >
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
