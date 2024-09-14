import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for handling errors and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    try {
      const response = await axios.post(
        "http://localhost:1000/api/login/teacher",
        { email, password },
        {
          withCredentials: true, // Important to send cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
      
        navigate("/"); 
      }
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="text-sm mt-4 text-gray-800">
                    Don't have an account
                    <a
                      href="/SignUp" 
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Register here
                    </a>
                  </p>
                </div>

                {/* Display error message if any */}
                {error && (
                  <div className="mb-4 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-gray-800 text-xs block mb-2">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter email"
                    />
                    {/* Email Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path
                            d="M0 512h512V0H0Z"
                            data-original="#000000"
                          ></path>
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          stroke-miterlimit="10"
                          stroke-width="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="text-gray-800 text-xs block mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    {/* Password Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a
                      href="/forgot-password" // Update this link to your forgot password route
                      className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                <div className="space-x-6 flex justify-center mt-6">
                  {/* Google Sign-In Button */}
                  <button
                    type="button"
                    className="border-none outline-none"
                    onClick={() => {
                      window.location.href =
                        "http://localhost:1000/api/auth/google"; // Update to your Google OAuth route
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      className="inline"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fbbd00"
                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                        data-original="#fbbd00"
                      />
                      <path
                        fill="#0f9d58"
                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                        data-original="#0f9d58"
                      />
                      <path
                        fill="#31aa52"
                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                        data-original="#31aa52"
                      />
                      <path
                        fill="#3c79e6"
                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                        data-original="#3c79e6"
                      />
                      <path
                        fill="#cf2d48"
                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.341 12.924 96.167 39.833z"
                        data-original="#cf2d48"
                      />
                      <path
                        fill="#eb4132"
                        d="M335.069 144.931C308.517 118.379 272.391 104 235.609 104V0C154.775 0 84.104 46.712 52.823 114.215h86.308v86.308C166.881 160.72 210.376 134 260 134c25.367 0 49.13 6.989 69.477 19.131l5.592-5.592z"
                        data-original="#eb4132"
                      />
                    </svg>
                  </button>

                  {/* Facebook Sign-In Button */}
                  <button
                    type="button"
                    className="border-none outline-none"
                    onClick={() => {
                      window.location.href =
                        "http://localhost:1000/api/auth/facebook"; // Update to your Facebook OAuth route
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1877f2"
                      height="32px"
                      width="32px"
                      className="inline"
                      viewBox="0 0 310 310"
                    >
                      <path
                        fill="#ffffff"
                        d="M81 155v-30c0-9-1-12 1-20 1-4 6-8 10-10 8-3 25-3 36-3 0-4-1-5-1-6-1-11-1-29 6-38 9-12 22-17 38-17h47c4 1 8 1 12 2v14c0 6-1 12-1 18-1 7-1 8-8 8h-36c-5 0-8 1-11 4-4 4-3 13-3 18v4h47c1 0 3 0 4 1 1 0 2 2 2 3l-2 19c-1 3-2 3-5 3h-45v155h-46V155h-23c-4 0-9-4-9-8z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="md:max-w-lg w-full px-4">
              <img
                src="https://i.pinimg.com/originals/9a/64/55/9a6455ffeee524d0a4c27f4112f7df3a.gif"
                alt="sign in"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
