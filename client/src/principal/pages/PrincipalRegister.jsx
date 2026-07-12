import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerAPI } from '../../services/allAPI';

export default function RegisterPage() {
  const navigate = useNavigate();

  // Form State (Unchanged Logic)
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
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const result = await registerAPI(registerData);
      console.log('Registration result:', result);

      if (result?.status === 200 || result?.data) {
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/principal-login');
        }, 1500);
      } else {
        toast.error(result?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-slate-50 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        
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
              Principal Administration Hub
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Empowering leadership through digital intelligence.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Access your comprehensive management suite. Streamline academic coordination, oversee institutional metrics, and orchestrate modern workflows from a unified interface.
            </p>
            
            {/* Embedded Mini UI Preview Component for Premium Look */}
            <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-24 h-2 bg-zinc-800 rounded" />
                </div>
                <div className="w-12 h-4 bg-indigo-950 border border-indigo-800 text-[10px] text-indigo-400 font-semibold rounded flex items-center justify-center">
                  Active
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-zinc-800/60 rounded" />
                <div className="w-[85%] h-3 bg-zinc-800/40 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Clean Ultra Modern Form Container */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 lg:p-16 bg-white">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            
            {/* Header Block */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Create Account</h1>
              <p className="text-sm text-zinc-500">
                Register below to establish your administrator profile credentials.
              </p>
            </div>

            {/* Register Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Full Name Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 dynamic-input"
                    type="text"
                    name="fullName"
                    placeholder="e.g. Dr. Alexander Vance"
                    value={registerData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {registerData.fullName && (
                    <button
                      type="button"
                      className="absolute right-4 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
                      onClick={() => handleClearField('fullName')}
                    >
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Email Address Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Email Address</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="email"
                    name="email"
                    placeholder="name@institution.edu"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                  />
                  {registerData.email && (
                    <button
                      type="button"
                      className="absolute right-4 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
                      onClick={() => handleClearField('email')}
                    >
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Username Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Username</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="text"
                    name="username"
                    placeholder="Choose a professional handle"
                    value={registerData.username}
                    onChange={handleChange}
                    required
                  />
                  {registerData.username && (
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
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Password</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                  />
                  {registerData.password && (
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

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="text-xs font-semibold text-zinc-700 tracking-wide">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    className="peer w-full text-sm bg-zinc-50/50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 py-3 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {registerData.confirmPassword && (
                    <button
                      type="button"
                      className="absolute right-4 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full hover:bg-zinc-100 transition-colors"
                      onClick={() => handleClearField('confirmPassword')}
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
                Create Account
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>

            {/* Footer Link Section */}
            <div className="text-center text-sm text-zinc-500 border-t border-zinc-100 pt-6">
              <p>
                Already registered?{' '}
                <a 
                  href="/principal-login" 
                  className="text-indigo-600 font-semibold no-underline hover:text-indigo-700 hover:underline transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}