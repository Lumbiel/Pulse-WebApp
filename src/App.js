import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginScreen from './pages/AdminLoginScreen';
import AdminDoctorManagement from './pages/AdminDoctorManagement'; // We'll work on this next

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to="/admin/login" />} /> 
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/doctors" element={<AdminDoctorManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
