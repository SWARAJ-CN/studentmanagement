import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import { loginAPI } from '../../services/allAPI';

export default function LoginPage() {
  const navigate = useNavigate(); // Hook to redirect users after logging in

  // Form State
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleClearField = (fieldName) => {
    setLoginData(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAPI();
      
      // 1. Target the correct key ("principal") from your json-server payload
      const principalList = result?.data?.principal || result?.data;

      // 2. Added explicit "return" keywords inside the .find statement
      const matchedUser = principalList.find((item) => {
        return item.username === loginData.username && item.password === loginData.password;
      });

      if (matchedUser) {
        alert(`Welcome back, ${matchedUser.fullName}!`);
        // Store user details in session/localStorage if needed
        sessionStorage.setItem("user", JSON.stringify(matchedUser));
        
        // Redirect user to dashboard
        navigate('/principal-dashboard'); 
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong with the server connection.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 font-sans antialiased">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-[380px]">

        {/* Header Block */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-500">Please enter your credentials to login</p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Username Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="text"
              name="username"
              placeholder="Enter the username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="border-none bg-none text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-opacity duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible"
              onClick={() => handleClearField('username')}
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Password Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter the password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="border-none bg-none text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-opacity duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible"
              onClick={() => handleClearField('password')}
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            className="bg-[#2f2ee9] hover:bg-[#1e1dd0] active:scale-[0.98] text-white border-none py-[0.85rem] text-[0.95rem] font-semibold rounded-lg cursor-pointer transition-all duration-200 mt-2 shadow-md shadow-blue-600/10"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link Section */}
        <div className="text-center mt-6 text-sm text-slate-500">
          <p>Don't have an account? <Link to={'/principal-register'} className="text-[#2f2ee9] font-medium no-underline hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}