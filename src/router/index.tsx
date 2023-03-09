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
const Layout = lazy(() => import("@/layout/Layout"));
const Error = Loader(lazy(() => import("@/pages/Error/Error")));
const NotFound = Loader(lazy(() => import("@/pages/Notfound/NotFound")));
export const router : RouteObject[] = [
  {
    path: "/",
    children: [
      { path: "*", element: <NotFound /> },
    ],
  },
];
