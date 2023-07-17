import { NavLink, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser, setUser } from "../app/userSlice";
import { LiaAddressBook } from "react-icons/lia";
import {
  MdStackedBarChart,
  MdLibraryAdd,
  MdLibraryBooks,
} from "react-icons/md";
import { toast } from "react-toastify";
import { UserServerData } from "../interfaces/interfaces";
import { BiLogOut } from "react-icons/bi";
import Mytip from "./Mytip";
import Modal from "./Modal";
import { useState } from "react";

type Props = {
  small?: boolean;
  onClose?: (arg: boolean) => void;
};
export default function Menu({ small = false, onClose = () => {} }: Props) {
  const { user } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const logOut = () => {
    localStorage.removeItem("user");
    toast.success("Logged out");
    dispatch(setUser({} as UserServerData));
    return <Navigate to="/auth" replace />;
  };
  const linkStyle =
    "bg-slate-500 shadow rounded text-slate-50 p-2 text-sm  transition hover:cursor-pointer  hover:bg-slate-700 flex items-center gap-2";
  const active = " bg-slate-800";
  return (
    <aside
      className={`bg-slate-50 shadow h-full cursor-default ${
        small ? "rounded-lg w-full " : "sm:ml-auto sm:w-1/4 "
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {open && (
        <Modal
          resetBtnText="Go back"
          submitBtnText="Log out"
          runFunction={logOut}
          onClose={setOpen}
        >
          Are you sure you want to log out?
        </Modal>
      )}
      <div className="flex items-center justify-between ">
        {!small && (
          <h1 className="text-slate-700 text-center  break-words mt-2 w-full">
            {user.userName}
          </h1>
        )}
      </div>
      <nav className="flex flex-col p-2 gap-2">
        <NavLink
          onClick={() => onClose(false)}
          className={({ isActive }) =>
            isActive ? linkStyle + active : linkStyle
          }
          to={`/tests`}
        >
          {small ? (
            <Mytip text="Available tests">
              <MdLibraryBooks className="text-slate-50 text-2xl" />
            </Mytip>
          ) : (
            <MdLibraryBooks className="text-slate-50 text-2xl" />
          )}
          {!small && "Available tests"}
        </NavLink>
        <NavLink
          onClick={() => onClose(false)}
          className={({ isActive }) =>
            isActive ? linkStyle + active : linkStyle
          }
          to={`/create`}
        >
          {small ? (
            <Mytip text="Create test">
              <MdLibraryAdd className="text-slate-50 text-2xl" />
            </Mytip>
          ) : (
            <MdLibraryAdd className="text-slate-50 text-2xl" />
          )}

          {!small && "Create test"}
        </NavLink>
        <NavLink
          onClick={() => onClose(false)}
          className={({ isActive }) =>
            isActive ? linkStyle + active : linkStyle
          }
          to={`/stats`}
        >
          {small ? (
            <Mytip text="Statistic">
              <MdStackedBarChart className="text-slate-50 text-2xl" />
            </Mytip>
          ) : (
            <MdStackedBarChart className="text-slate-50 text-2xl" />
          )}
          {!small && "Statistic"}
        </NavLink>

        {user.isAdmin ? (
          <NavLink
            onClick={() => onClose(false)}
            className={({ isActive }) =>
              isActive ? linkStyle + active : linkStyle
            }
            to={`/admin/users`}
          >
            {small ? (
              <Mytip text="Users">
                <LiaAddressBook className="text-slate-50 text-2xl " />
              </Mytip>
            ) : (
              <LiaAddressBook className="text-slate-50 text-2xl" />
            )}
            {!small && "Users"}
          </NavLink>
        ) : null}
        <div className={linkStyle} onClick={() => setOpen(true)}>
          {small ? (
            <Mytip text="Log out">
              <BiLogOut className=" text-slate-50 text-2xl  cursor-pointer" />
            </Mytip>
          ) : (
            <BiLogOut className=" text-slate-50 text-2xl  cursor-pointer" />
          )}

          {!small && "Log out"}
        </div>
      </nav>
    </aside>
  );
}
