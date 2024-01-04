import React, {useContext} from 'react';
import {Navigate } from 'react-router-dom';
import Home from './Home/Home';
import authContext from '../context/authContext';


const ProtectedRoute = ({children}) => {
    const {authenticated} = useContext(authContext);
    return (
        authenticated ? children : <Navigate to="/login" replace/>
    );
  };
  
  export default ProtectedRoute;
