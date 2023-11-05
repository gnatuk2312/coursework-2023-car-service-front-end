import { FC } from "react";
import { Container, Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <Container component="footer" sx={{ mt: "auto", p: 1 }}>
      <Typography align="center">
        © Copyright Hnat Liashenko {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default Footer;
