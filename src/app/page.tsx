"use client";
import { FC } from "react";
import { Container, Typography } from "@mui/material";

import Protected from "@/components/HOC/Protected";

const Home: FC = () => {
  return (
    <Container component="header">
      <Typography variant="h4" component="h1" mt={10}>
        ПЗ для обліку виконання робіт на посту обслуговування станції
        автосервісу
      </Typography>
      <Typography variant="h5" component="h2" mt={4}>
        Скористайтесь навігаційною панеллю вгорі для переходу між сторінками
      </Typography>
    </Container>
  );
};

export default Protected(Home);
