import Header from "./components/Header/Header"
import MainHome from "./components/MainHome/MainHome";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import EditName from "./components/EditName/EditName";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../src/sass/resets.scss"
import User from "./components/User/User";

import SecurityRoutes from "./SecurityRoutes";




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<SecurityRoutes> <User /> </SecurityRoutes>} />
        <Route path="/editUser" element= {<SecurityRoutes> <EditName/> </SecurityRoutes>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
