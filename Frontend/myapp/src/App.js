import React, { useEffect } from "react";
import { useDispatch } from "react-redux";  // 🆕 Add Redux hooks
import { loadUserThunk } from "./redux/thunks/authThunks";  // 🆕 Import thunk
import AppRoutes from "./route/AppRoutes";

export default function App() {
  const dispatch = useDispatch();  // 🆕 Add dispatch

  // 🆕 Load user on app mount
  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  return <AppRoutes />;  // 🆕 Remove AuthProvider (using Redux now)
}