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
      <Typography variant="h6" component="h3" mt={4}>
        {`TODO: improve Auth layer (update admin session on page reload)`}
        <br />
        {`TODO: create responsive layout for mobile and tablet`}
        <br />
        {`TODO: put all business logic into local hooks`}
        <br />
        {`TODO: make spare parts to be optional on creating performed work`}
        <br />
        {`TODO: update <NoData/> components image`}
        <br />
        {`TODO: create reusable <HeaderSection/> component`}
        <br />
        {`TODO: add pending state for all dialog actions`}
        <br />
        {`TODO: handle errors in dialog actions`}
      </Typography>
    </Container>
  );
};

export default Protected(Home);
