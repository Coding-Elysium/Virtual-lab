import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endPoint } from "../helper/helper";

const Login = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${endPoint}/auth/loginAdmin`, account);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setAccount({ email: "", password: "" });
    }
  };

  const handleAccount = (name, event) => {
    setAccount({ ...account, [name]: event.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="600"
          textAlign="center"
          mb={3}
          color="primary"
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            value={account.email}
            onChange={(e) => handleAccount("email", e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={account.password}
            onChange={(e) => handleAccount("password", e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "16px",
              transition: "transform 0.2s ease",
              ":hover": { transform: "scale(1.02)" },
            }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
