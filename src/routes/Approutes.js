import Signup from "../Components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import { AuthProvider } from "../context/AuthContext";
import Feed from "../Components/Feed";
import ForgotPassword from "../Components/ForgotPassword";
import PrivateRoute from "../Components/PrivateRoute";
import Profile from "../Components/Profile";

function Approutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Feed />} />
          </Route>
          <Route exact path="/profile/:id" element={<PrivateRoute />}>
            <Route exact path="/profile/:id" element={<Profile />} />
          </Route>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />} path="/forgotpassword" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Approutes;
