import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { NAVIGATION } from "@/common/constants/navigation.constants";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static" component="nav">
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography flex={1}>Курсова СТО</Typography>
          <Stack direction="row" spacing={3} color="white">
            {NAVIGATION.map(({ href, label }, index) => {
              const isActive = pathname === href;

              return (
                <MuiLink
                  key={index}
                  component={Link}
                  href={href}
                  underline={isActive ? "always" : "hover"}
                  color="inherit"
                >
                  {label}
                </MuiLink>
              );
            })}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
