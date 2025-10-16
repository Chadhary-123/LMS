// //context api
// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";
// import { setAuthToken } from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = localStorage.getItem("lms_auth");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setUser(parsed.user);
//         setAuthToken(parsed.token);
//       } catch (e) {
//         localStorage.removeItem("lms_auth");
//       }
//     }
//   }, []);

//   const login = ({ user, token }) => {
//     setUser(user);
//     setAuthToken(token);
//     localStorage.setItem("lms_auth", JSON.stringify({ user, token }));
//   };

//   const logout = () => {
//     setUser(null);
//     setAuthToken(null);
//     localStorage.removeItem("lms_auth");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
