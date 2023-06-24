import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestsPage from "./components/TestsPage";
import TestPage from "./components/TestPage";
import Auth from "./components/Auth";
import Register from "./components/Register";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUser, setUser } from "./app/userSlice";

function App() {
  const user = useAppSelector(getUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestsPage />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </BrowserRouter>
  );
}

export default App;
