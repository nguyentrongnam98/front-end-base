import React from "react";
import { AuthProvider } from "@/context/authProvider";
import { Outlet, Navigate } from "react-router-dom";
export default function AuthLayout() {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <AuthProvider>
      <Outlet/>
    </AuthProvider>
  );
}
