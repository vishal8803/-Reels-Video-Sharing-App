import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Login.css";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { LOGO, IMG1, IMG2, IMG3, IMG4 } from "../utils/Constant";
import { AuthContext } from "../context/AuthContext";
import ValidateEmail from "./Validate";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const useStyles = makeStyles({
    text2: {
      color: "grey",
      textAlign: "center",
      fontSize: "0.9rem",
      padding: "0.5rem",
    },
    text3: {
      textAlign: "center",
    },
    card2: {
      marginTop: "2%",
    },
  });

  const handleClick = async () => {
    setLoading(true);

    // Check for empty field
    if (email == "" || password == "") {
      setError("Please enter all the fields!");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    // Check For Email
    if (ValidateEmail(email) == false) {
      setError("Please Enter Correct Email!");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    // Check for password
    if (password.length <= 5) {
      setError("Password must be atleast of length 6");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    try {
      let res = await login(email, password);
      setLoading("false");
      navigate("/");
    } catch (e) {
      setError(
        "The email / password you entered doesn't belong to an account. Please check your email / password and try again."
      );
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const classes = useStyles();
  return (
    <div className="login-body">
      <div className="crousel-body">
        <div className="crousel-itself">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={4}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={IMG1} />
              </Slide>
              <Slide index={1}>
                <Image src={IMG2} />
              </Slide>
              <Slide index={2}>
                <Image src={IMG3} />
              </Slide>
              <Slide index={3}>
                <Image src={IMG4} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="card-wrapper">
        <Card sx={{ maxWidth: 360 }} variant="outlined">
          <CardContent>
            <div className="logo-wrapper">
              <img src={LOGO} className="logo-img" />
            </div>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic1"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              size="small"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic2"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              className={classes.text3}
              color="#1e9df7"
              variant="subtitle1"
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              fullWidth
              variant="contained"
              onClick={handleClick}
              disabled={loading}
            >
              Log In
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
          <Typography className={classes.text2} variant="subtitle1">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#1e9df7" }}
            >
              Sign up
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
