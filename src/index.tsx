import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestsPage from "./components/TestsPage";
import TestPage from "./components/TestPage";
import Auth from "./components/Auth";
import Register from "./components/Register";
import Stats from "./components/Stats";
import HomePage from "./components/HomePage";
import CreateTest from "./components/CreateTest";
import TestResults from "./components/TestResults";
const container = document.getElementById("root")!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/tests",
        element: <TestsPage />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/stats/:id",
        element: <TestResults />,
      },
      {
        path: "/create",
        element: <CreateTest />,
      },
    ],
  },
  {
    path: "/test/:id",
    element: <TestPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
