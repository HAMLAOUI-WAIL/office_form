import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
const GoBack = () => {
  const iconStyle = {
    fontSize: "28px",
  };

  return (
    <Typography sx={{ mb: 2 }}>
      <Link to="/">
        <RiArrowGoBackFill color="white" style={iconStyle} />
      </Link>
    </Typography>
  );
};

export default GoBack;
