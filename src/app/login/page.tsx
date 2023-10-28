"use client";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordField from "@/components/PasswordField";
import { signInRequest } from "@/common/services/api/auth/auth.api";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    await signInRequest({ body: { email, password } }).then((response) => {
      localStorage.setItem("accessToken", response.accessToken);
    });
  };

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Box component="header">
        <Typography variant="h4" component="h1" textAlign="center" mb={4}>
          Увійти як адміністратор
        </Typography>
      </Box>
      <Box component="section">
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
          <TextField value={email} onChange={handleEmailChange} label="Email" />
          <PasswordField
            value={password}
            onChange={handlePasswordChange}
            label="Пароль"
          />
          <Button type="submit" variant="contained">
            Увійти
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
