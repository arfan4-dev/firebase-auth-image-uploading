import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Login from './Pages/Login/Login';
import Signup from './Pages/signup/Signup';
import ProtectedRoute from './Component/AuthProvider/ProtectedRoute';
import Home from './Component/Home'
function App() {
  return (
    <div className="">
      <Routes>
        {/* <ProtectedRoute path="/" element={<Dashboard />} /> */}
        <Route exact path='/' element={<Home />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
