import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import headerImage from "./../images/jobbg.jpg";

const Header = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    backgroundImage: `url(${headerImage})`,
    minHeight: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.secondary.main,
  }));
  return (
    <>
      <StyleHeader></StyleHeader>
    </>
  );
};

export default Header;
