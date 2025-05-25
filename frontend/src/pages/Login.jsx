import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Login = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelAccount = (field, event) => {
    setAccount({ ...account, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", account);

    if (account.username === "admin123" && account.password === "qweqwe") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Box
        border="1px solid #ccc"
        padding="40px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="8px"
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={(event) => handelAccount("username", event)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            onChange={(event) => handelAccount("password", event)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="20px"
          >
            <MuiLink
              component={RouterLink}
              to="/signup"
              underline="none"
              variant="body2"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
