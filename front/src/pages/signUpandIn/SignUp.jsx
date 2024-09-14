// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '', // role will be set based on user selection
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsModalOpen(true); // Open modal after form submission
//   };

//   // Handle role selection from modal
//   const handleRoleSelection = async (role) => {
//     setFormData((prevData) => ({ ...prevData, role }));
//     setIsModalOpen(false); // Close the modal after selection

//     try {
//       const response = await axios.post(`http://localhost:1000/api/register/${role}`, formData);
//       setSuccess(response.data.message); // Set success message
//       navigate('/'); // Redirect on success
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };

//   // Handle Google signup success
//   const handleGoogleSignupSuccess = async (response) => {
//     try {
//       const idToken = response.credential;
//       const res = await axios.post(
//         "http://localhost:3000/api/users/register/google",
//         { id_token: idToken },
//         { withCredentials: true }
//       );

//       if (res.data.token) {
//         Swal.fire({
//           icon: "success",
//           title: "Signup Successful",
//           text: "You have successfully signed up with Google!",
//           confirmButtonText: "OK",
//         }).then(() => {
//           navigate("/");
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Signup Error",
//         text: error.response?.data?.message || "There was an error during Google signup. Please try again.",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const handleGoogleSignupError = () => {
//     Swal.fire({
//       icon: "error",
//       title: "Signup Error",
//       text: "There was an error during Google signup. Please try again.",
//       confirmButtonText: "OK",
//     });
//   };

//   return (
//     <div className="font-[sans-serif]">
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
//           <div className="md:max-w-md w-full px-4 py-4">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-12">
//                 <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
//                 <p className="text-sm mt-4 text-gray-800">
//                   Already have an account?
//                   <Link to="/signin" className="text-purple-600 font-semibold hover:underline ml-1 whitespace-nowrap">
//                     Sign in here
//                   </Link>
//                 </p>
//               </div>

//               {error && <div className="text-red-500 mb-4">{error}</div>}
//               {success && <div className="text-green-500 mb-4">{success}</div>}

//               <div>
//                 <label className="text-gray-800 text-xs block mb-2">Username</label>
//                 <div className="relative flex items-center">
//                   <input
//                     name="username"
//                     type="text"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                     className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
//                     placeholder="Enter username"
//                   />
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <label className="text-gray-800 text-xs block mb-2">Email</label>
//                 <div className="relative flex items-center">
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
//                     placeholder="Enter email"
//                   />
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <label className="text-gray-800 text-xs block mb-2">Password</label>
//                 <div className="relative flex items-center">
//                   <input
//                     name="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
//                     placeholder="Enter password"
//                   />
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <label className="text-gray-800 text-xs block mb-2">Confirm Password</label>
//                 <div className="relative flex items-center">
//                   <input
//                     name="confirmPassword"
//                     type="password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
//                     placeholder="Confirm password"
//                   />
//                 </div>
//               </div>

//               <div className="mt-12">
//                 <button
//                   type="submit"
//                   className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-purple-600 hover:bg-purple-800 focus:outline-none"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="md:max-w-lg w-full px-4">
//             <img src="https://i.pinimg.com/originals/df/39/2f/df392fb90619818047bf4f09e0adbc36.gif" alt="sign up" />
//           </div>
//         </div>
//       </div>

//       {/* Modal for role selection */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <img src="https://i.pinimg.com/originals/b0/7c/0f/b07c0fc116d1868db07a8bbc2d79aab9.gif" alt="" />
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-4 ">Tell us a bit about yourself! Are you joining as a Teacher or a Coach?</h2>
//             <div className="flex justify-center mb-4">
//               <button
//                 onClick={() => handleRoleSelection('teacher')}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-md m-1 w-60"
//               >
//                 Teacher
//               </button>
//               <button
//                 onClick={() => handleRoleSelection('coach')}
//                 className="px-4 py-2 bg-black text-white rounded-md m-1 w-60"
//               >
//                 Coach
//               </button>
//             </div>
//             <GoogleLogin
//               onSuccess={handleGoogleSignupSuccess}
//               onError={handleGoogleSignupError}
//               logo="Google"
//               buttonText="Sign up with Google"
//               className="w-full bg-[#4285F4] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
//               icon={<FaGoogle className="mr-2" />}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // role will be set based on user selection
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsModalOpen(true); // Open modal after form submission
  };

  // Handle role selection from modal
  const handleRoleSelection = async (role) => {
    setFormData((prevData) => ({ ...prevData, role }));
    setIsModalOpen(false); // Close the modal after selection

    try {
      const response = await axios.post(`http://localhost:1000/api/register/teacher`, formData);
      setSuccess(response.data.message); // Set success message
      navigate('/'); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  // Handle Google signup success
  const handleGoogleSignupSuccess = async (response) => {
    try {
      const idToken = response.credential;
      const res = await axios.post(
        "http://localhost:3000/api/users/register/google",
        { id_token: idToken },
        { withCredentials: true }
      );

      if (res.data.token) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "You have successfully signed up with Google!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Error",
        text: error.response?.data?.message || "There was an error during Google signup. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };


  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
                <p className="text-sm mt-4 text-gray-800">
                  Already have an account?
                  <Link to="/signin" className="text-purple-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    Sign in here
                  </Link>
                </p>
              </div>

              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}

              <div>
                <label className="text-gray-800 text-xs block mb-2">Username</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-purple-600 hover:bg-purple-800 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
          
            </form>
          </div>

          <div className="md:max-w-lg w-full px-4">
            <img src="https://i.pinimg.com/originals/d7/64/c7/d764c70776b64e523cb4eea2f322db96.gif" alt="sign up" />
          </div>
        </div>
      </div>

      {/* Modal for role selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-lg shadow-lg ">
          <h2 className="text-xl font-semibold mb-4 mx-auto">Tell us a bit about yourself! Are you joining as a Teacher or a Coach?</h2>
          <img src="https://i.pinimg.com/originals/af/00/8e/af008ef02e388439b74e74463678833b.gif" alt="" className='w-60 mx-auto'/>

            <div className="flex justify-center mb-4">
              <button
                onClick={() => handleRoleSelection('teacher')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md m-1 w-60"
              >
                Teacher
              </button>
              <button
                onClick={() => handleRoleSelection('coach')}
                className="px-4 py-2 bg-black text-white rounded-md m-1 w-60"
              >
                Coach
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
