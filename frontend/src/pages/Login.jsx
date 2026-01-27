// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const submitButtonRef = useRef(null);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

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
//             submitButtonRef.current?.focus();
//           }
//           break;
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const emailValid = validateField('email', email);
//     const passwordValid = validateField('password', password);

//     if (!emailValid || !passwordValid) {
//       toast.error("Please fix the errors before submitting");
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const result = await login(email, password);

//       if (result?.success) {
//         toast.success("Login successful! Welcome back.");
//         navigate("/home");
//       } else {
//         toast.error(result?.message || "Invalid email or password");
//       }
//     } catch (error) {
//       toast.error("Server error. Please try again later.");
//       console.error("Login error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Eye icon components (inline SVG instead of react-icons)
//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   return (
//     <div className="login-container">
//       {/* LEFT SIDE - HERO SECTION */}
//       <div className="login-left">
//         <div className="hero-content">
//           <h1 className="hero-title">Welcome back to</h1>
//           <h1 className="hero-brand">Hamro Ghum Gham</h1>
//           <p className="hero-subtitle">
//             Login to continue your journey and explore beautiful destinations
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE - FORM SECTION */}
//       <div className="login-right">
//         <div className="login-form-container">
//           {/* Logo */}
//           <div className="login-logo-container">
//             <img
//               src="/images/logo.png"
//               alt="Hamro Ghum Gham Logo"
//               className="login-logo"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 e.target.nextSibling.style.display = 'flex';
//               }}
//             />
//             <div className="login-logo-placeholder">
//               HGG
//             </div>
//           </div>

//           <h2 className="login-form-title">Login</h2>
//           <p className="login-form-subtitle">Enter your credentials to access your account</p>

//           <form onSubmit={handleSubmit} className="login-form">
//             {/* Email Field */}
//             <div className="login-form-group">
//               <label className="login-label">Email</label>
//               <input
//                 ref={emailRef}
//                 type="email"
//                 className={`login-input ${errors.email ? 'error' : ''}`}
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (errors.email) {
//                     setErrors({ ...errors, email: null });
//                   }
//                 }}
//                 onKeyDown={(e) => handleKeyDown(e, 'email')}
//                 autoComplete="email"
//               />
//               {errors.email && (
//                 <span className="login-error-text">⚠ {errors.email}</span>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="login-form-group">
//               <label className="login-label">Password</label>
//               <div className="password-input-wrapper">
//                 <input
//                   ref={passwordRef}
//                   type={showPassword ? "text" : "password"}
//                   className={`login-input ${errors.password ? 'error' : ''}`}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (errors.password) {
//                       setErrors({ ...errors, password: null });
//                     }
//                   }}
//                   onKeyDown={(e) => handleKeyDown(e, 'password')}
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle-icon"
//                   onClick={togglePasswordVisibility}
//                   tabIndex="-1"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="login-error-text">⚠ {errors.password}</span>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <div className="login-options-row">
//               <Link to="/forgot-password" className="forgot-password-link">
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               ref={submitButtonRef}
//               type="submit"
//               disabled={isLoading}
//               className="login-submit-button"
//             >
//               {isLoading ? (
//                 <>
//                   <span className="login-spinner"></span>
//                   Logging in...
//                 </>
//               ) : (
//                 'Login'
//               )}
//             </button>

//             {/* Sign Up Link */}
//             <div className="login-signup-container">
//               <span className="login-signup-text">Don't have an account? </span>
//               <Link to="/signup" className="login-signup-link">
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



// src/pages/Login.jsx
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
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
            submitButtonRef.current?.focus();
          }
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(email, password);

      if (result?.success) {
        console.log("Login result user:", result.user); // Debug log
        console.log("User role:", result.user?.role); // Debug log
        console.log("Is admin?", result.user?.role === 'admin'); // Debug log
        toast.success("Login successful! Welcome back.");

        // Redirect based on user role
        if (result.user?.role === 'admin') {
          console.log("Navigating to admin dashboard"); // Debug log
          navigate("/admin/dashboard");
        } else {
          console.log("Navigating to home"); // Debug log
          navigate("/home");
        }
      } else {
        toast.error(result?.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back to</h1>
          <h1 className="hero-brand">Hamro Ghum Gham</h1>
          <p className="hero-subtitle">
            Login to continue your journey and explore beautiful destinations
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-logo-container">
            <img
              src="/images/logo.png"
              alt="Hamro Ghum Gham Logo"
              className="login-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="login-logo-placeholder">
              HGG
            </div>
          </div>

          <h2 className="login-form-title">Login</h2>
          <p className="login-form-subtitle">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className={`login-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                autoComplete="email"
              />
              {errors.email && (
                <span className="login-error-text">⚠ {errors.email}</span>
              )}
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: null });
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <span className="login-error-text">⚠ {errors.password}</span>
              )}
            </div>

            <div className="login-options-row">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isLoading}
              className="login-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            <div className="login-signup-container">
              <span className="login-signup-text">Don't have an account? </span>
              <Link to="/signup" className="login-signup-link">
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