import React, { useState } from 'react';
import { registerAPI } from '../../services/allAPI';

export default function RegisterPage() {
  // Form State
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleClearField = (fieldName) => {
    setRegisterData(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Registering with:', registerData);

    const result = await registerAPI(registerData)
    console.log(result)

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 font-sans antialiased py-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-[420px]">

        {/* Header Block */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
          <p className="text-sm text-slate-500">Get started with your new profile</p>
        </div>

        {/* Register Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Full Name Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={registerData.fullName}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="border-none bg-none text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-opacity duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible"
              onClick={() => handleClearField('fullName')}
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Email Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={registerData.email}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="border-none bg-none text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-opacity duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible"
              onClick={() => handleClearField('email')}
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Username Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={registerData.username}
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
              placeholder="Create a password"
              value={registerData.password}
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

          {/* Confirm Password Input Container */}
          <div className="group relative w-full h-11 flex items-center px-[0.8em] rounded-e-[8px] rounded-s-[8px] bg-white border border-slate-200 transition-[border-radius] duration-500 box-border focus-within:rounded-[1px] focus-within:border-transparent
            before:content-[''] before:absolute before:bg-[#2f2ee9] before:scale-x-0 before:origin-center before:w-full before:h-[2px] before:left-0 before:bottom-[-1px] before:rounded-[1px] before:transition-transform before:duration-300 focus-within:before:scale-100">
            <input
              className="peer text-sm bg-transparent w-full h-full px-[0.5em] border-none text-slate-800 focus:outline-none"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="border-none bg-none text-[#8b8ba7] cursor-pointer flex items-center justify-center p-0 opacity-0 invisible transition-opacity duration-200 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:visible"
              onClick={() => handleClearField('confirmPassword')}
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
            Sign Up
          </button>
        </form>

        {/* Footer Link Section */}
        <div className="text-center mt-6 text-sm text-slate-500">
          <p>Already have an account? <a href="#login" className="text-[#2f2ee9] font-medium no-underline hover:underline">Log in</a></p>
        </div>
      </div>
    </div>
  );
}