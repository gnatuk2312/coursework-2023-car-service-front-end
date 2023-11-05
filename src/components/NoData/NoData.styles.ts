import { styled, Container as MuiContainer } from "@mui/material";

export const Container = styled(MuiContainer)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 32,
  marginBottom: 32,
}) as typeof MuiContainer;
