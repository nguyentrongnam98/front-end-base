import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export default function AuthLayout() {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Outlet/>
    </div>
  );
}
