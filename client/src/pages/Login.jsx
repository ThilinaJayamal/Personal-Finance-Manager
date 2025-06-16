import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppProvider';

function Login() {
  const { login, register, navigate } = useAppContext();

  const [state, setState] = useState('login');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'sign-up') {
        await register({ name, email, password });
        setState('login');
      } else {
        await login({ email, password });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-100 to-white'>
      <div className='bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 text-gray-700'>
        <h2 className='text-3xl font-semibold text-gray-900 text-center mb-4'>
          {state === "sign-up" ? "Create account" : "Login"}
        </h2>
        <p className='text-center text-sm mb-6 text-gray-500'>
          {state === "sign-up" ? "Create your account" : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit}>
          {
            state === "sign-up" && (
              <div className='mb-4'>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder='Full Name' 
                  required
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                />
              </div>
            )
          }

          <div className='mb-4'>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder='Email id' 
              required
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
            />
          </div>

          <div className='mb-4'>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder='Password' 
              required
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
            />
          </div>

          <button 
            className='w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all'
          >
            {state === "sign-up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className='text-center mt-4'>
          {
            state === "sign-up" ? (
              <p className='text-sm text-gray-500'>
                Already have an account?{" "}
                <span 
                  className='text-blue-600 cursor-pointer hover:underline' 
                  onClick={() => setState("login")}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className='text-sm text-gray-500'>
                Don't have an account?{" "}
                <span 
                  className='text-blue-600 cursor-pointer hover:underline' 
                  onClick={() => setState("sign-up")}
                >
                  Sign Up
                </span>
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
