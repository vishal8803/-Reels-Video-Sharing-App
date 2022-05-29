import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import "./Signup.css";
import { LOGO } from "../utils/Constant";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import ValidateEmail from "./Validate";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorState, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);

  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
      fontSize: "0.9rem",
      padding: "0.5rem",
    },
    card2: {
      marginTop: "2%",
    },
  });

  const handleClick = async () => {
    // Disable Button
    setLoading(true);

    // Check For Email
    if (ValidateEmail(email) == false) {
      setError("Please Enter Correct Email!");
      setErrorState("error");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    // Post request for signup
    try {
      let res = await resetPassword(email);
      setError("Reset Passord Link Sent! Check Your email.");
      setErrorState("success");
      setTimeout(() => {
        setError("");
      }, 3000);
      setEmail("");
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError("We don't have any account with this email address.");
      setErrorState("error");
      setTimeout(() => {
        setError("");
      }, 3000);
      setEmail("");
      setLoading(false);
    }
  };

  const classes = useStyles();
  return (
    <div className="signup-body">
      <div className="card-wrapper">
        <Card sx={{ maxWidth: 360 }} variant="outlined">
          <CardContent>
            <div className="logo-wrapper">
              <img src={LOGO} className="logo-img" />
            </div>
            <Typography className={classes.text1} variant="subtitle1">
              Enter your email and we'll send you a link to get back into your
              account.
            </Typography>
            {error != "" && <Alert severity={errorState}>{error}</Alert>}

            <TextField
              id="outlined-basic1"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              margin="dense"
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClick}
              size="small"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </CardActions>
          <div style={{ textAlign: "center" }}>
            {loading && <CircularProgress />}
          </div>
        </Card>
        <Card
          sx={{ maxWidth: 360 }}
          className={classes.card2}
          variant="outlined"
        >
          <Typography className={classes.text1} variant="subtitle1">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1e9df7" }}
            >
              Back to Login{" "}
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
