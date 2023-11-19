import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
// import "./Footer.css";

const StyledFooter = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  /* position: fixed;
  bottom: 0; */
  width: 100%;
`;

const FooterText = styled(Typography)`
  margin: 10px 0 0 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Divider />
      <FooterText variant="body2">
        © 2023 E-Learning Platform. All rights reserved.
      </FooterText>
    </StyledFooter>
  );
};

export default Footer;
