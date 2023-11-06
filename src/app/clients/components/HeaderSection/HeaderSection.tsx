import { FC } from "react";
import { Container, Typography } from "@mui/material";

const HeaderSection: FC = () => {
  return (
    <Container component="header" sx={{ mt: 6, mb: 2 }}>
      <Typography variant="h4" component="h1">
        Клієнти
      </Typography>
    </Container>
  );
};

export default HeaderSection;
