import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppProvider';

function Login() {
  // Destructure login, register, and navigate functions from context
  const { login, register, navigate } = useAppContext();

  // Track current form state: either 'login' or 'sign-up'
  const [state, setState] = useState('login');

  // Form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message to display to user
  const [error, setError] = useState("");

  // Loading state to prevent double submissions
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setError(""); // Clear previous error
    setLoading(true); // Set loading to true during request

    try {
      if (state === 'sign-up') {
        // Call register function with user data
        await register({ name, email, password });
        setState('login'); // Switch to login view after successful sign-up
      } else {
        // Call login function
        await login({ email, password });
      }
    } catch (err) {
      // Show a user-friendly error message
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-100 to-white'>
      <div className='bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 text-gray-700'>

        {/* Logo and Title */}
        <div className='border-b border-gray-200 px-2 py-6 mb-6'>
          <div className='flex justify-center gap-2 items-center text-3xl font-black text-green-500'>
            <img src="./logo.png" className="size-12" alt="Logo" />
            <h1>CashFlowX</h1>
          </div>
          <p className='text-sm font-semibold mt-2 text-center'>Track Your Cash Flow</p>
        </div>

        {/* Header */}
        <h2 className='text-3xl font-semibold text-gray-900 text-center mb-4'>
          {state === "sign-up" ? "Create account" : "Login"}
        </h2>
        <p className='text-center text-sm mb-6 text-gray-500'>
          {state === "sign-up" ? "Create your account" : "Login to your account"}
        </p>

        {/* Show error message */}
        {error && (
          <p className='text-red-500 text-sm text-center mb-4'>{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name input only for sign-up */}
          {state === "sign-up" && (
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
          )}

          {/* Email input */}
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

          {/* Password input */}
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className='w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50'
          >
            {loading ? "Please wait..." : state === "sign-up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch between Login and Sign Up */}
        <div className='text-center mt-4'>
          {state === "sign-up" ? (
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
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;
