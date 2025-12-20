
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./SignUp.css";

// // Path to images in public folder
// const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
// const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.username.trim()) {
//       newErrors.username = "Username is required";
//     }
    
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
    
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       console.log("Signup successful:", formData);
//       alert("Signup successful! Check console for details.");
//       // You can add navigation here: navigate('/login');
//     }, 1500);
//   };

//   return (
//     <div className="signup-container">
//       {/* Left Side - Hero Section */}
//       <div 
//         className="signup-left"
//         style={{
//           '--bg-image': `url(${backgroundUrl})`
//         }}
//       >
//         <div className="hero-content">
//           <h1 className="hero-title">Sign up to</h1>
//           <h1 className="hero-brand">Hamro Ghum Gham</h1>
//           <p className="hero-subtitle">
//             Start your journey with us and explore the beautiful destinations of Nepal
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Form Section */}
//       <div className="signup-right">
//         <div className="signup-form-container">
//           {/* Logo */}
//           <div className="signup-logo-container">
//             <img
//               src={logoUrl}
//               alt="Hamro Ghum Gham Logo"
//               className="signup-logo"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 e.target.nextSibling.style.display = 'flex';
//               }}
//             />
//             <div className="signup-logo-placeholder" style={{ display: 'none' }}>
//               HGG
//             </div>
//           </div>

//           <h2 className="signup-form-title">Create Account</h2>
//           <p className="signup-form-subtitle">Fill in your details to get started</p>

//           <form onSubmit={handleSubmit} className="signup-form">
//             {/* Username */}
//             <div className="signup-form-group">
//               <label className="signup-label">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Enter your username"
//                 className={`signup-input ${errors.username ? 'error' : ''}`}
//               />
//               {errors.username && (
//                 <span className="signup-error-text">⚠ {errors.username}</span>
//               )}
//             </div>

//             {/* Email */}
//             <div className="signup-form-group">
//               <label className="signup-label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 className={`signup-input ${errors.email ? 'error' : ''}`}
//               />
//               {errors.email && (
//                 <span className="signup-error-text">⚠ {errors.email}</span>
//               )}
//             </div>

//             {/* Password */}
//             <div className="signup-form-group">
//               <label className="signup-label">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a strong password"
//                 className={`signup-input ${errors.password ? 'error' : ''}`}
//               />
//               {errors.password && (
//                 <span className="signup-error-text">⚠ {errors.password}</span>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="signup-form-group">
//               <label className="signup-label">Confirm Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Re-enter your password"
//                 className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
//               />
//               {errors.confirmPassword && (
//                 <span className="signup-error-text">⚠ {errors.confirmPassword}</span>
//               )}
//             </div>

//             {/* Show Password Checkbox */}
//             <div className="show-password-container">
//               <input
//                 type="checkbox"
//                 id="showPassword"
//                 checked={showPassword}
//                 onChange={(e) => setShowPassword(e.target.checked)}
//                 className="show-password-checkbox"
//               />
//               <label htmlFor="showPassword" className="show-password-label">
//                 Show Password
//               </label>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="signup-submit-button"
//             >
//               {isLoading ? (
//                 <>
//                   <span className="signup-spinner"></span>
//                   Creating Account...
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </button>

//             {/* Login Link */}
//             <div className="signup-login-container">
//               <span className="signup-login-text">Already have an account? </span>
//               <Link to="/login" className="signup-login-link">
//                 Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

// Path to images in public folder
const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Create refs for each input field
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const checkboxRef = useRef(null);
  const submitButtonRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle Enter key press to move to next field
  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      
      // Validate current field before moving
      const newErrors = { ...errors };
      let isValid = true;

      switch (currentField) {
        case 'username':
          if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
          } else {
            delete newErrors.username;
          }
          break;
        case 'email':
          if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
          } else {
            delete newErrors.email;
          }
          break;
        case 'password':
          if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
          } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
          } else {
            delete newErrors.password;
          }
          break;
        case 'confirmPassword':
          if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
          } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
          } else {
            delete newErrors.confirmPassword;
          }
          break;
      }

      setErrors(newErrors);

      // If current field is valid, move to next field
      if (isValid) {
        switch (currentField) {
          case 'username':
            emailRef.current?.focus();
            break;
          case 'email':
            passwordRef.current?.focus();
            break;
          case 'password':
            confirmPasswordRef.current?.focus();
            break;
          case 'confirmPassword':
            checkboxRef.current?.focus();
            break;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup successful:", formData);
      alert("Signup successful! Check console for details.");
      // You can add navigation here: navigate('/login');
    }, 1500);
  };

  return (
    <div className="signup-container">
      {/* Left Side - Hero Section */}
      <div 
        className="signup-left"
        style={{
          '--bg-image': `url(${backgroundUrl})`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Sign up to</h1>
          <h1 className="hero-brand">Hamro Ghum Gham</h1>
          <p className="hero-subtitle">
            Start your journey with us and explore the beautiful destinations of Nepal
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="signup-right">
        <div className="signup-form-container">
          {/* Logo */}
          <div className="signup-logo-container">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="signup-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="signup-logo-placeholder" style={{ display: 'none' }}>
              HGG
            </div>
          </div>

          <h2 className="signup-form-title">Create Account</h2>
          <p className="signup-form-subtitle">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Username */}
            <div className="signup-form-group">
              <label className="signup-label">Username</label>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'username')}
                placeholder="Enter your username"
                className={`signup-input ${errors.username ? 'error' : ''}`}
              />
              {errors.username && (
                <span className="signup-error-text">⚠ {errors.username}</span>
              )}
            </div>

            {/* Email */}
            <div className="signup-form-group">
              <label className="signup-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                placeholder="you@example.com"
                className={`signup-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <span className="signup-error-text">⚠ {errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="signup-form-group">
              <label className="signup-label">Password</label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'password')}
                placeholder="Create a strong password"
                className={`signup-input ${errors.password ? 'error' : ''}`}
              />
              {errors.password && (
                <span className="signup-error-text">⚠ {errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="signup-form-group">
              <label className="signup-label">Confirm Password</label>
              <input
                ref={confirmPasswordRef}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'confirmPassword')}
                placeholder="Re-enter your password"
                className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
              />
              {errors.confirmPassword && (
                <span className="signup-error-text">⚠ {errors.confirmPassword}</span>
              )}
            </div>

            {/* Show Password Checkbox */}
            <div className="show-password-container">
              <input
                ref={checkboxRef}
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitButtonRef.current?.focus();
                  }
                }}
                className="show-password-checkbox"
              />
              <label htmlFor="showPassword" className="show-password-label">
                Show Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isLoading}
              className="signup-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="signup-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            {/* Login Link */}
            <div className="signup-login-container">
              <span className="signup-login-text">Already have an account? </span>
              <Link to="/login" className="signup-login-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;