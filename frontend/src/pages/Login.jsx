import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", account);

    axios
      .post("http://localhost:5000/auth/loginAdmin", account)
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setAccount({ email: "", password: "" });
      });
  };
  const handleAccount = (name, event) => {
    setAccount({
      ...account,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

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
        <form noValidate onSubmit={handleNavigate}>
          <TextField
            value={account.email}
            onChange={(event) => handleAccount("email", event)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <TextField
            value={account.password}
            onChange={(event) => handleAccount("password", event)}
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
            {/* <MuiLink
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
            </MuiLink> */}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
