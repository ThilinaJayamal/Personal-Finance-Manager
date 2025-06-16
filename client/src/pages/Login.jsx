import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState('sign-up');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='flex items-center justify-center min-h-screen px-6
    sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
      text-indigo-300 text-sm'>

        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === "sign-up" ? "Create account" : "Login"}</h2>
        <p className='text-center text-sm mb-6'>{state === "sign-up" ? "Create your account" : "Login to your account"}</p>

        <form onSubmit={{}}>
          {
            state === "sign-up" && (
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
               
                <input type="text" className="bg-transparent outline-none" placeholder='Full Name' required
                  onChange={(e) => setName(e.target.value)} value={name} />
              </div>
            )
          }

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
            
            <input type="email" className="bg-transparent outline-none" placeholder='Email id' required
              onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
           
            <input type="password" className="bg-transparent outline-none" placeholder='Password' required
              onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <p className='mb-4 text-indigo-500 cursor-pointer' onClick={() => navigate("/reset-password")}>Forgot password?</p>
          <button className='w-full py-2.5 rounded-full 
          bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold'>{state === "sign-up" ? "Sign Up" : "Login"}</button>
        </form>

        {
          state === "sign-up" ?
            (
              <p className='text-center text-xs mt-4 text-gray-400'>Aready have an account?{" "}
                <span className='text-blue-400 cursor-pointer underline' onClick={() => setState("login")}>Login here</span>
              </p>
            )
            :
            (
              <p className='text-center text-xs mt-4 text-gray-400'>Don't have an account?{" "}
                <span className='text-blue-400 cursor-pointer underline' onClick={() => setState("sign-up")}>Sign Up</span>
              </p>
            )
        }

      </div>
    </div>
  )
}

export default Login