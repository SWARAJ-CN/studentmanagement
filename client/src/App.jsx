import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import About from './pages/About'
import Feature from './pages/Feature'
import Notice from './components/Notice'
import Contact from './pages/Contact'

const App = () => {
  return (
    <>
    <Toaster
    position='bottom-rigth'
    />
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/features' element={<Feature/>}/>
      <Route path='/notice' element={<Notice/>}/>
      <Route path='/contact' element={<Contact/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App