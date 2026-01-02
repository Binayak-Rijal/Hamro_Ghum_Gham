
// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import "./Login.css";

// // Path to images in public folder
// const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
// const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   // Create refs for each input field
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const checkboxRef = useRef(null);
//   const submitButtonRef = useRef(null);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Validate individual fields
//   const validateField = (field, value) => {
//     const newErrors = { ...errors };

//     switch (field) {
//       case 'email':
//         if (!value) {
//           newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           newErrors.email = "Email is invalid";
//         } else {
//           delete newErrors.email;
//         }
//         break;
//       case 'password':
//         if (!value) {
//           newErrors.password = "Password is required";
//         } else if (value.length < 6) {
//           newErrors.password = "Password must be at least 6 characters";
//         } else {
//           delete newErrors.password;
//         }
//         break;
//     }

//     setErrors(newErrors);
//     return !newErrors[field];
//   };

//   // Handle Enter key press to move to next field
//   const handleKeyDown = (e, currentField) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();

//       let isValid = false;

//       switch (currentField) {
//         case 'email':
//           isValid = validateField('email', email);
//           if (isValid) {
//             passwordRef.current?.focus();
//           }
//           break;
//         case 'password':
//           isValid = validateField('password', password);
//           if (isValid) {
//             checkboxRef.current?.focus();
//           }
//           break;
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate all fields
//     const emailValid = validateField('email', email);
//     const passwordValid = validateField('password', password);

//     if (emailValid && passwordValid) {
//       console.log("Email:", email, "Password:", password);
//       alert("Login successful!");
//       // Add your login logic here
//     }
//   };

//   return (
//     <div 
//       className="login-page"
//       style={{
//         backgroundImage: `url(${backgroundUrl})`,
//       }}
//     >
//       {/* Overlay with 50% opacity */}
//       <div className="overlay" style={{ opacity: 0.5 }}></div>

//       {/* Center Wrapper */}
//       <div className="login-wrapper">
//         <div className="login-card">

//           {/* Logo */}
//           <div className="text-center mb-4">
//             <img
//               src={logoUrl}
//               alt="Hamro Ghum Gham Logo"
//               className="login-logo"
//             />
//           </div>

//           {/* Title */}
//           <h4 className="text-center mb-4">
//             Login – <span className="brand-name">Hamro Ghum Gham</span>
//           </h4>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="form-label">Email</label>
//               <input
//                 ref={emailRef}
//                 type="email"
//                 className={`form-control ${errors.email ? 'error' : ''}`}
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (errors.email) {
//                     setErrors({ ...errors, email: null });
//                   }
//                 }}
//                 onKeyDown={(e) => handleKeyDown(e, 'email')}
//               />
//               {errors.email && (
//                 <span className="error-text">⚠ {errors.email}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Password</label>
//               <input
//                 ref={passwordRef}
//                 type={showPassword ? "text" : "password"}
//                 className={`form-control ${errors.password ? 'error' : ''}`}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (errors.password) {
//                     setErrors({ ...errors, password: null });
//                   }
//                 }}
//                 onKeyDown={(e) => handleKeyDown(e, 'password')}
//               />
//               {errors.password && (
//                 <span className="error-text">⚠ {errors.password}</span>
//               )}
//             </div>

//             {/* Show Password & Forgot Password in same row */}
//             <div className="form-options-row mb-4">
//               <div className="show-password-container">
//                 <input
//                   ref={checkboxRef}
//                   type="checkbox"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={togglePasswordVisibility}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       submitButtonRef.current?.focus();
//                     }
//                   }}
//                   className="show-password-checkbox"
//                 />
//                 <label htmlFor="showPassword" className="show-password-label">
//                   Show Password
//                 </label>
//               </div>
              
//               <div className="forgot-password-container">
//                 <Link to="/forgot-password" className="forgot-password-link">
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             <button 
//               ref={submitButtonRef}
//               type="submit" 
//               className="btn btn-primary w-100 mb-3"
//             >
//               Login
//             </button>

//             {/* Optional: Sign up link */}
//             <div className="text-center">
//               <span className="text-muted">Don't have an account? </span>
//               <Link to="/signup" className="signup-link">
//                 Sign up
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api"; // Import the login function
import "./Login.css";

const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;

const Login = () => {
  const navigate = useNavigate(); // For redirecting after login
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);
  const submitButtonRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid";
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let isValid = false;

      switch (currentField) {
        case 'email':
          isValid = validateField('email', email);
          if (isValid) {
            passwordRef.current?.focus();
          }
          break;
        case 'password':
          isValid = validateField('password', password);
          if (isValid) {
            checkboxRef.current?.focus();
          }
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // Send credentials to backend
      const response = await login({
        email: email,
        password: password
      });

      // If successful
      setSuccessMessage(response.message || "Login successful!");
      console.log("Login successful:", response);
      
      // Store user data in localStorage (optional)
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect to home/dashboard after 1 second
      setTimeout(() => {
        // For now, redirect to signup (you can create a dashboard later)
        alert(`Welcome back, ${response.user.name}!`);
        // navigate('/dashboard'); // Uncomment when you create dashboard
      }, 1000);

    } catch (error) {
      // If there's an error from backend
      setErrors({ general: error });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      <div className="overlay" style={{ opacity: 0.5 }}></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="text-center mb-4">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="login-logo"
            />
          </div>

          <h4 className="text-center mb-4">
            Login – <span className="brand-name">Hamro Ghum Gham</span>
          </h4>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              ✓ {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              ⚠ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
              />
              {errors.email && (
                <span className="error-text">⚠ {errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'password')}
              />
              {errors.password && (
                <span className="error-text">⚠ {errors.password}</span>
              )}
            </div>

            <div className="form-options-row mb-4">
              <div className="show-password-container">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
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
              
              <div className="forgot-password-container">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button 
              ref={submitButtonRef}
              type="submit" 
              className="btn btn-primary w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;