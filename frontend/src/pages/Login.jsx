


// import React, { useState } from "react";
// import "./Login.css";

// // Path to images in public folder
// const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
// const logoUrl = `${process.env.PUBLIC_URL}/logo.png`; // Logo image
// const eyeOpenUrl = `${process.env.PUBLIC_URL}/eye.jpg`; // Eye open icon
// const eyeClosedUrl = `${process.env.PUBLIC_URL}/eyeoff.png`; // Eye closed icon

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Email:", email, "Password:", password);
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
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Password</label>
//               <div className="password-input-container">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-control"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className={`password-toggle-btn ${showPassword ? 'active' : ''}`}
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   <img 
//                     src={showPassword ? eyeClosedUrl : eyeOpenUrl}
//                     alt={showPassword ? "Hide password" : "Show password"}
//                     className="eye-icon"
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password Link */}
//             <div className="mb-4 text-end">
//               <a href="/forgot-password" className="forgot-password-link">
//                 Forgot Password?
//               </a>
//             </div>

//             <button type="submit" className="btn btn-primary w-100 mb-3">
//               Login
//             </button>

//             {/* Optional: Sign up link */}
//             <div className="text-center">
//               <span className="text-muted">Don't have an account? </span>
//               <a href="/signup" className="signup-link">
//                 Sign up
//               </a>
//             </div>
//           </form>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login; 

import React, { useState } from "react";
import "./Login.css";

// Path to images in public folder
const backgroundUrl = `${process.env.PUBLIC_URL}/bg.jpg`;
const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      {/* Overlay with 50% opacity */}
      <div className="overlay" style={{ opacity: 0.5 }}></div>

      {/* Center Wrapper */}
      <div className="login-wrapper">
        <div className="login-card">

          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="login-logo"
            />
          </div>

          {/* Title */}
          <h4 className="text-center mb-4">
            Login – <span className="brand-name">Hamro Ghum Gham</span>
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Show Password & Forgot Password in same row */}
            <div className="form-options-row mb-4">
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  className="show-password-checkbox"
                />
                <label htmlFor="showPassword" className="show-password-label">
                  Show Password
                </label>
              </div>
              
              <div className="forgot-password-container">
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>

            {/* Optional: Sign up link */}
            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <a href="/signup" className="signup-link">
                Sign up
              </a>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;