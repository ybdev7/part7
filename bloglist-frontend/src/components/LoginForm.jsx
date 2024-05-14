import { useState } from "react";
import { Button, FormLabel, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  const theme = useTheme();
  console.log(theme.spacing(2));
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          margin="normal"
          label="Username"
          size="small"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          margin="normal"
          label="Password"
          size="small"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
