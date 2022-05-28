import Signup from "../Components/Signup"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Components/Login';
import { AuthProvider, AuthContext } from "../context/AuthContext";
import Feed from "../Components/Feed";
import ForgotPassword from "../Components/ForgotPassword";

import {useContext} from 'react';
import PrivateRoute from "../Components/PrivateRoute";

function Approutes() {
  
  return (
    <BrowserRouter>
        <AuthProvider >
            <Routes>
                <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/' element={<Feed/>}/>
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
