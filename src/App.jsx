import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import UpperNavbar from "./Components/UpperNavbar"
import Home from "./Pages/Home"
import { ContextProvider } from "./ContextPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Seller from "./Pages/Seller"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextProvider>

      <UpperNavbar />
      <Navbar />

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="seller" element={<Seller />} />
      </Routes>

      <Footer />

    </ContextProvider>
  )
}

export default App
