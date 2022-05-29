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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import ValidateEmail from "./Validate";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { database, storage } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

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

    // Check for empty field
    if (email == "" || password == "" || name == "" || file == null) {
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

    // Post request for signup
    try {
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      // console.log(uid);
      const uploadTask = storage.ref(`/data/${uid}/ProfileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);

      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(`File uploding... ${progress}% done`)
      }

      function fn2(error) {
        console.log(error);
      }

      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((URL) => {
          // console.log(URL)
          let res = database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            profileImageURL: URL,
            createdAt: database.getTimeStamp(),
          });

          setLoading(false);
          navigate("/");
        });
      }
    } catch (e) {
      console.log(e);
      setError(e);
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
            {error != "" && <Alert severity="error">{error}</Alert>}
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
            <TextField
              id="outlined-basic2"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              margin="dense"
            />
            <TextField
              id="outlined-basic3"
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              margin="dense"
            />
            <Button
              size="small"
              color="warning"
              fullWidth
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload Profile Image{" "}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClick}
              size="small"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Sign Up
            </Button>
          </CardActions>
          <div style={{ textAlign: "center" }}>
            {loading && <CircularProgress />}
          </div>
          <p className={classes.text1} variant="subtitle1">
            By signing up, you agree to our Terms, Conditions and Cookies
            policy.
          </p>
        </Card>
        <Card
          sx={{ maxWidth: 360 }}
          className={classes.card2}
          variant="outlined"
        >
          <Typography className={classes.text1} variant="subtitle1">
            Have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1e9df7" }}
            >
              Log in
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
