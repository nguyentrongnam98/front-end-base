import React from 'react';
import { Navigate } from 'react-router-dom';


export default function Login() {
  if (localStorage.getItem('accessToken')) {
    return <Navigate to={'/dashboard'} />;
  }
  return (
    <div>Login page</div>
  );
}
