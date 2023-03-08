import React, { Suspense, lazy } from "react";
import  { RouteObject } from "react-router-dom";

export type TODO = any;
const Loader = (Component: TODO) => (props: TODO) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
const AuthLayout = lazy(() => import("@/layout/AuthLayout"));
const Login = Loader(lazy(() => import("@/pages/login/Login")));
const Dashboard = Loader(lazy(() => import("@/pages/Dashboard/Dashboard")));
const Admin = Loader(lazy(() => import("@/pages/Dashboard/Admin")));
const Error = Loader(lazy(() => import("@/pages/Error/Error")));
const NotFound = Loader(lazy(() => import("@/pages/Notfound/NotFound")));
export const router : RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "login",
        errorElement:<Error/>,
        element: <Login />,
      },
      {
        element: <AuthLayout />,
        errorElement:<Error/>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                path: ":id",
                element: <Admin />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
