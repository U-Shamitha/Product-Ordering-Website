import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import authContext from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const {setAuthenticated} = useContext(authContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const setCookieWithExpiration = (name, value, minutes) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + minutes * 60 * 1000);
    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    Cookies.set('currentUserToken', cookieString);
    console.log(Cookies.get('currentUserToken'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    if(username){
      if(password){
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 60, 
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if(data.id){
          const {token, ...otherData} = data
          // Cookies.set('currentUserToken', token);
          setCookieWithExpiration('currentUserToken', token, 60);
          localStorage.setItem('currentUser', JSON.stringify(otherData))
          setTimeout(()=>{
            navigate("/")
            setAuthenticated(true)
          }, 2000)
        }else{
          setErrorMsg(data.message)
        }
      })
      .catch((error) => {
        setErrorMsg('Authentication Failed:'+ error.message)
        console.log(errorMsg)
        console.error('Authentication Failed:', error); 
      });
    }else{
      setErrorMsg('Please enter Password');
    }
    }else{
      setErrorMsg('Please enter Username');
    }
  };

  useEffect(()=>{
    setErrorMsg(null);
  },[username, password])

  return (
    <div className="flex items-center justify-center bg-gray-50" style={{ height: '100vh' }}>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded w-[350px]">
     
      <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
      <div className="flex mb-3">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-blue-500 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <FontAwesomeIcon icon={faUser} color='white'/>
        </span>
        <input type="text" id="username" 
         className="mb-0 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" 
         placeholder="your name"
         onChange={handleUsernameChange}
         />
      </div>
      <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-blue-500 border rounded-e-0 border-gray-300 rounded-s-md">
        <FontAwesomeIcon icon={faLock} color='white'/>
        </span>
        <input type="password" id="password" 
        className="mb-0 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" 
        placeholder="your password"
        onChange={handlePasswordChange}
        />
      </div>
      {errorMsg && <p className='pt-5 pl-2 text-red-600'>! {errorMsg}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-6 rounded">
        Log In
      </button>
    </form>
    </div>
  )

}

export default LoginPage;