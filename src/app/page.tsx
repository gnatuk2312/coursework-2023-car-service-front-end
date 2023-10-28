"use client";
import { FC } from "react";
import { Container } from "@mui/material";

import Protected from "@/components/HOC/Protected";

const Home: FC = () => {
  return <Container component="section">CourseWork Front End</Container>;
};

export default Protected(Home);
