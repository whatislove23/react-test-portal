import axios from "axios";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { UserServerData } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { deleteData, fetchData, putData } from "../functions/apiFunctions";

export default function AdminAboutUserCard({ id }: { id?: string }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserServerData[]>([]);
  const [open, setOpen] = useState(false);
  const onDelete = async (id: number) => {
    const loadingToast = toast.loading("Loading...");
    deleteData(`admin/delete/user/${id}`)
      .then((res) => {
        navigate(-1);
        toast.dismiss(loadingToast);
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: false });
        toast.dismiss(loadingToast);
      });
  };
  const onAdminUpdate = (id: number) => {
    const loadingToast = toast.loading("Loading...");
    putData(`setAdmin/${id}`).then(() => {
      toast.dismiss(loadingToast);
      toast.success("User updated");
    });
  };
  useEffect(() => {
    fetchData(`admin/users/${id}`)
      .then((res) => {
        setUserData(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, onAdminUpdate]);
  return (
    <>
      {userData.map((user) => {
        const regDate = new Date(user.creationDate).toLocaleDateString();
        return (
          <div className="flex justify-between" key={user.id}>
            {open && (
              <Modal
                resetBtnText="Go back"
                submitBtnText="Delete"
                runFunction={() => onDelete(user.id)}
                onClose={setOpen}
              >
                Are you sure you want to delete the user and their tests?
              </Modal>
            )}
            <div className="text-slate-800">
              <h1 className="text-3xl">
                {user.userName}{" "}
                <span
                  className={` text-2xl ${
                    user.isAdmin ? "text-yellow-400" : "text-green-400"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}{" "}
                </span>
              </h1>
              <h2>
                Registration date:
                <span className="text-red-600"> {regDate} </span>{" "}
              </h2>
              <h3>{user.email}</h3>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={() => onAdminUpdate(user.id)}>
                Make {user.isAdmin ? "a user" : "an admin"}{" "}
              </Button>
              <Button
                addStyle=" bg-red-800 hover:bg-red-600"
                onClick={() => setOpen(true)}
              >
                Delete user
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
