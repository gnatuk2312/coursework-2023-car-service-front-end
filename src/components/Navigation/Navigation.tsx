"use client";
import { FC } from "react";
import Link from "next/link";
import { Link as MuiLink, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { Root } from "./Navigation.styled";

const Navigation: FC = () => {
  return (
    <Root>
      <Stack direction="row" spacing={1} alignItems="center">
        <HomeIcon color="primary" />
        <Typography variant="subtitle1" component="p">
          <MuiLink component={Link} href="/login" underline="hover">
            Login
          </MuiLink>
        </Typography>
      </Stack>
      <br />
      <MuiLink component={Link} href="/clients">
        To All Clients
      </MuiLink>
      <br />
      <MuiLink component={Link} href="/vehicles">
        To All Vehicles
      </MuiLink>
    </Root>
  );
};

export default Navigation;
