import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      <Link to="/" color="inherit"></Link>
    </Typography>
  );
};

export default Copyright;
