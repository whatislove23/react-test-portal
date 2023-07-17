import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function PageNotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-slate-50 container w-full h-96 rounded-lg shadow text-slate-700 text-center justify-center flex flex-col gap-4">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-2xl">Oooops... page not found</h2>
        <NavLink to="/tests/" className="mt-4">
          <Button>Go Home</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
