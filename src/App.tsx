import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { ContextProvider } from './Context/ProductContext';


const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
    <ContextProvider>
      {isHome && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
