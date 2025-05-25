import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

const Signup = () => {
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
          Sign Up
        </Typography>
        <form className="" noValidate>
          <TextField
            onChange=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoFocus
          />
          <TextField
            onChange=""
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
          <TextField
            onChange=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
            onClick=""
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
