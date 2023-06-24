import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getUser, setUser } from "../app/userSlice";

import { BiLogOut } from "react-icons/bi";
import { UserServerData } from "../interfaces/interfaces";

function HomePage() {
  const { user } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const linkStyle =
    "bg-white bg-opacity-20 shadow rounded text-white p-2 text-sm  hover:bg-opacity-70 hover:text-gray-800 hover:transition hover:cursor-pointer";
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }
  const logOut = () => {
    localStorage.removeItem("user");
    dispatch(setUser({} as UserServerData));
    return <Navigate to="/auth" replace />;
  };
  return (
    <div className="container mx-auto p-10 flex flex-col sm:flex-row gap-5 h-screen">
      <aside className="w-full  bg-white bg-opacity-20 sm:w-1/5 rounded-lg shadow">
        <div className="flex items-center justify-between p-2 ">
          <BiLogOut
            className=" text-white text-2xl  cursor-pointer"
            onClick={logOut}
          />
          <h1 className="text-white text-center  break-words ">
            {user.userName}
          </h1>
        </div>
        <nav className="flex flex-col p-2 gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? linkStyle + " bg-white bg-opacity-60 text-gray-700"
                : linkStyle
            }
            to={`/tests`}
          >
            Available tests
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? linkStyle + " bg-white bg-opacity-60 text-gray-700"
                : linkStyle
            }
            to={`/create`}
          >
            Create test
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? linkStyle + " bg-white bg-opacity-60 text-gray-700"
                : linkStyle
            }
            to={`/stats`}
          >
            Statistics
          </NavLink>
        </nav>
      </aside>
      <article className="bg-white bg-opacity-20 w-full rounded-lg shadow">
        <Outlet />
      </article>
    </div>
  );
}

export default HomePage;
