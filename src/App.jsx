import React from "react"
import { Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import UpperNavbar from "./Components/UpperNavbar"
import Home from "./Pages/Home"
import { ContextProvider } from "./ContextPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {
  return (
    <ContextProvider>

      <UpperNavbar/>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>

      <Footer />
      
    </ContextProvider>
  )
}

export default App
