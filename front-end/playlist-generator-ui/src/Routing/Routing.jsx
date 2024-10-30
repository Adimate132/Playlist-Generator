import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Landing from '../Pages/Landing/Landing.jsx';
import Login from '../Pages/Login/Login.jsx';




const Routing = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/landing" element={<Landing/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Routing;