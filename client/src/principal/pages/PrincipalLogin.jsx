import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { loginAPI } from '../../services/allAPI';

export default function LoginPage() {
  const navigate = useNavigate();

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
      
      // Target the correct key ("principal") from your json-server payload
      const principalList = result?.data?.principal || result?.data;

      // Find matching user
      const matchedUser = principalList.find((item) => {
        return item.username === loginData.username && item.password === loginData.password;
      });

      if (matchedUser) {
        toast.success(`Welcome back, ${matchedUser.fullName || matchedUser.username}!`);
        
        // Store user details in session/localStorage
        sessionStorage.setItem("user", JSON.stringify(matchedUser));
        
        // Slight delay to allow the user to see the success toast before redirecting
        setTimeout(() => {
          navigate('/principal-dashboard');
        }, 1200);

      } else {
        toast.error("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong with the server connection.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-slate-50 font-sans antialiased selection:bg-indigo-500 selection:text-white relative">
        
        {/* Left Side - Modern Decorative Hero Panel */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-zinc-950 p-12 overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
          
          {/* Decorative Mesh Overlay Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="relative z-10 max-w-lg text-center lg:text-left flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400 text-xs font-medium tracking-wide w-fit mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Secure Authentication
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Welcome back to your workspace.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Log in to access your administrative dashboard, monitor institutional performance, and manage academic workflows from your secure command center.
            </p>
            
            {/* Embedded Mini UI Preview Component for Premium Look */}
            <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-indigo-300 text-xs font-bold">
                    PR
                  </div>
                  <div className="w-24 h-2 bg-zinc-800 rounded" />
                </div>
                <div className="w-16 h-4 bg-emerald-950/50 border border-emerald-800/50 text-[10px] text-emerald-500 font-semibold rounded flex items-center justify-center">
                  Verified
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-zinc-800/60 rounded" />
                <div className="w-[70%] h-3 bg-zinc-800/40 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Clean Ultra Modern Form Container */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 lg:p-16 bg-white relative">
          
          {/* Back to Home Button */}
          <Link 
            to="/" 
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <div className="w-full max-w-[400px] flex flex-col gap-8 mt-8 lg:mt-0">
            
            {/* Header Block */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Sign In</h1>
              <p className="text-sm text-zinc-500">
                Please enter your credentials to access your dashboard.
              </p>
            </div>

            {/* Login Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Username Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Username</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={loginData.username}
                    onChange={handleChange}
                    required
                  />
                  {loginData.username && (
                    <button
                      type="button"
                      className="absolute right-4 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
                      onClick={() => handleClearField('username')}
                    >
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-700 tracking-wide">Password</label>
                  <a href="#forgot" className="text-xs text-indigo-600 font-medium hover:underline">Forgot password?</a>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                  {loginData.password && (
                    <button
                      type="button"
                      className="absolute right-4 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
                      onClick={() => handleClearField('password')}
                    >
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                className="w-full bg-zinc-950 hover:bg-zinc-900 active:scale-[0.99] text-white py-3.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-200 mt-3 shadow-lg shadow-zinc-950/10 hover:shadow-zinc-950/20 flex items-center justify-center gap-2"
              >
                Sign In
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>

            {/* Footer Link Section */}
            <div className="text-center text-sm text-zinc-500 border-t border-zinc-100 pt-6">
              <p>
                Don't have an account?{' '}
                <Link 
                  to="/principal-register" 
                  className="text-indigo-600 font-semibold no-underline hover:text-indigo-700 hover:underline transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}