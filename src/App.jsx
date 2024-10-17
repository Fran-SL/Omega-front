import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Inicio';
import Login from './pages/Login';
import Register from './pages/Registro';
import ResetPassword from './components/Forms/ResetPassword';
import Profile from './pages/Perfil';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} /> {/* Nueva ruta */}
        <Route path="/profile" element={<Profile />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
