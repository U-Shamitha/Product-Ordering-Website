import React,{useState, useEffect} from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";
import authContext from "../context/authContext";
import cartContext from "../context/cart/cartContext";
import CartGrid from "./CartProducts/CartGrid";
import Profile from "./Profile/Profile";

const AllRoutes = () => {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("currentUser"));
  const [cartProducts, setCartProducts] = useState(!!localStorage.getItem("cartProducts") ? JSON.parse(localStorage.getItem("cartProducts")) : []);

  return (
    <Router>
      {/* {console.log(Cookies.get('currentUserToken'))} */}
       <authContext.Provider value={{ authenticated, setAuthenticated }}>
       <cartContext.Provider value={{ cartProducts, setCartProducts }}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><Home/></ProtectedRoute>} path="/home" exact/>
          <Route element={<ProtectedRoute><CartGrid/></ProtectedRoute>} path="/cart" exact/>
          <Route element={<ProtectedRoute><Profile user={JSON.parse(localStorage.getItem("currentUser"))}/></ProtectedRoute>} path="/profile" exact/>
        </Routes>
        </cartContext.Provider>
        </authContext.Provider>
    </Router>
  );
};

export default AllRoutes;
