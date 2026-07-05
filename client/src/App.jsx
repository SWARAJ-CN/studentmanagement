import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const location = useLocation();

  const isStudent = location.pathname.startsWith("/student");
  const isTeacher = location.pathname.startsWith("/teacher");

  const hideLayout = isStudent || isTeacher;

  return (
    <>
    <Toaster
    position='bottom-rigth'
    />
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
     <Footer/>
    </>
  );
};

export default App;