import React, { useContext } from "react"
import { Routes, Route ,Navigate} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import UpperNavbar from "./Components/UpperNavbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Books from "./Pages/Books"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Contextpage from './ContextPage';
import UpdateProfile from "./Pages/UpdateProfile"
import Error from "./Pages/Error"
import AddBooks from "./Pages/AddBooks"
import EditBooks from "./Pages/EditBooks"

function App() {

  const {user,loading} = useContext(Contextpage)

  return (
    <>
      <div className={`${loading ? 'visible' : 'invisible'} flex justify-center items-center h-screen fixed w-full z-10`}><span className="loader m-10"></span></div>
      
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
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/"/>} />
        <Route path="books" element={<Books />} />
        <Route path="updateprofile" element={user ? <UpdateProfile /> : <Navigate to="/" />} />
        <Route path="addbook" element={<AddBooks />} />
        <Route path="editbook/:id" element={<EditBooks/>} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
 </>
  )
}

export default App
