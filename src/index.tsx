import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Auth from "./components/Auth";
import Stats from "./components/Stats";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import Register from "./components/Register";
import TestPage from "./components/TestPage";
import TestsPage from "./components/TestsPage";
import CreateTest from "./components/CreateTest";
import HomePage from "./components/HomePage";
import TestResults from "./components/TestResults";
import { ToastContainer, Zoom } from "react-toastify";
import AdminUsers from "./components/AdminUsers";
import AboutUser from "./components/AdminAboutUser";
import StatsTestUsers from "./components/StatsTestUsers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Header />
          <HomePage />
        </>
      ),
      children: [
        {
          path: "/",
          element: <TestsPage />,
        },
        {
          path: "/tests",
          element: <TestsPage />,
        },
        {
          path: "/stats",
          element: (
            <>
              <Stats />
            </>
          ),
        },
        {
          path: "/stats/:id",
          element: (
            <>
              <TestResults />
            </>
          ),
        },
        {
          path: "/results/:id",
          element: (
            <>
              <StatsTestUsers />
            </>
          ),
        },
        {
          path: "/create",
          element: (
            <>
              <CreateTest />,
            </>
          ),
        },
        {
          path: "/admin/users",
          element: (
            <>
              <AdminUsers />
            </>
          ),
        },
        {
          path: "admin/users/:id",
          element: (
            <>
              <AboutUser />
            </>
          ),
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
  ],
  { basename: "/react-test-portal/" }
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={1000}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      transition={Zoom}
    />
  </Provider>
);
