import { styled, CircularProgress as MuiCircularProgress } from "@mui/material";

export const CircularProgress = styled(MuiCircularProgress)({
  position: "absolute",
  top: "50%",
  left: "calc(50% - 20px)",
  transform: "translate(-50%, -50%)",
});
