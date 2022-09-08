import React from "react";
import { Snackbar, Alert, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const boxStyle = {
  width: { xs: "330px", md: "500px" },
  p: 4,
  marginTop: "10%",
  borderRadius: "10px",
  mx: "auto",
  alignItems: "center",
  minHeight: "300px",
  maxHeight: "40vh",
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { 
    if (location.state && location.state.signup) {
      setOpen(true);
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  const handleClose = ()=> {
    setOpen(false);
  }
  const Users = JSON.parse(localStorage.getItem("Users"))
    ? JSON.parse(localStorage.getItem("Users"))
    : [];

  const handleSubmit = () => {
    Users.forEach((user) => {
      if (user.email === email && user.password === password) {
        navigate("/post");
      }
      if(user.email === email && user.password !== password){
        setEmailError(false);
        setPasswordError(true);
      }
    });
    if(!Users.find(user => user.email === email)){
      setEmailError(true);
    }

    
  };
  return (
    <>
      <Paper sx={boxStyle}>
        <Stack spacing={3}>
          <Typography variant="h3" align="center">
            Login
          </Typography>
          <TextField
            required
            id="email-field"
            value={email}
            error = {emailError}
            helperText={emailError ? "Email not found" : ""}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          ></TextField>
          <TextField
            required
            value={password}
            error = {passwordError}
            helperText={passwordError ? "Incorrect Password" : ""}
            onChange={(e) => setPassword(e.target.value)}
            id="password-field"
            type="password"
            label="Password"
          ></TextField>
          <Stack spacing={2} direction="row" justifyContent="space-around">
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Account Successfully Created!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
