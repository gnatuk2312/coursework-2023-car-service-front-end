import { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = (): void => setShowPassword((show) => !show);

    return (
      <TextField
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleShowPassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
