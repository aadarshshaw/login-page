import { Button, TextField, Stack, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

const boxStyle = {
  width: { xs: "330px", md: "500px" },
  p: 4,
  marginTop: "10%",
  borderRadius: "10px",
  mx: "auto",
  alignItems: "center",
  minHeight: "350px",
  maxHeight: "50vh",
};

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [Users, setUsers] = useState(() => {
    const localData = localStorage.getItem("Users");
    return localData ? JSON.parse(localData) : [];
  });
  const handleClick = () => {
    if (
      email.length > 5 &&
      password.length > 7 &&
      password === confirmPassword
    ) {
      setUsers([...Users, { email, password }]);
      localStorage.setItem(
        "Users",
        JSON.stringify([...Users, { email, password }])
      );
      navigate("/", { state: { signup: true } });
    }
    if (email.length < 5) setEmailError(true);
    if (password.length < 8) setPasswordError(true);
    if (confirmPassword === "" || password !== confirmPassword)
      setConfirmPasswordError(true);
  };

  return (
    <Paper sx={boxStyle}>
      <Stack spacing={3}>
        <Typography variant="h3" align="center">
          Sign Up
        </Typography>
        <TextField
          required
          error={emailError}
          helperText={emailError ? "Email must be at least 5 characters" : ""}
          id="email-field"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
            if (emailError && email.length > 5) {
              setEmailError(false);
            }
          }}
        ></TextField>
        <TextField
          required
          error={passwordError}
          helperText={
            passwordError ? "Password must be at least 8 characters" : ""
          }
          id="password-field"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
            if (passwordError && password.length > 8) {
              setPasswordError(false);
            }
          }}
        ></TextField>
        <TextField
          required
          error={confirmPasswordError}
          helperText={confirmPasswordError ? "Passwords must match" : ""}
          id="confirm-password-field"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value.trim());
            if (confirmPasswordError && confirmPassword === password) {
              setConfirmPasswordError(false);
            }
          }}
        ></TextField>
        <Button variant="contained" onClick={handleClick}>
          Signup
        </Button>
      </Stack>
    </Paper>
  );
};

export default Signup;
