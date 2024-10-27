import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Landing from '../Pages/Landing/Landing.jsx';
import Login from '../Pages/Login/Login.jsx';




const Routing = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="*" render={() => <Redirect to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Routing;