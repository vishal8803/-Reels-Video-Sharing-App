import Signup from "../Components/Signup"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Components/Login';

function Approutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/signup" /> 
          <Route element={<Login />} path="/login" />
        </Routes>
    </BrowserRouter>
  );
}

export default Approutes;
