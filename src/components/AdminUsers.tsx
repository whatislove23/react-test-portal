import Mytip from "./Mytip";
import FindSortBar from "./FindSortBar";
import { BsTrash3 } from "react-icons/bs";
import Card from "./Card";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { UserServerData } from "../interfaces/interfaces";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { deleteData, fetchData } from "../functions/apiFunctions";
import Loader from "./loader/Loader";

function AdminPanel() {
  const { user } = useAppSelector(getUser);
  const storedUsers = useRef<UserServerData[]>([]);
  const [users, setUsers] = useState<UserServerData[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchData("admin/users")
      .then((response) => {
        setUsers(response?.data);
        storedUsers.current = response?.data;
        setLoading(false);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);
  const onDelete = (id: number) => {
    const loadingToast = toast.loading("Loading...");
    deleteData(`admin/delete/user/${id}`)
      .then((res) => {
        let data = storedUsers.current.filter((user) => user.id !== id);
        setUsers(data);
        storedUsers.current = data;
        toast.dismiss(loadingToast);
        toast.success(res?.data);
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
        toast.dismiss(loadingToast);
      });
  };
  return (
    <div>
      <h1 className="text-3xl text-slate-700 text-center">Users</h1>
      <div className="mt-2 flex flex-col gap-2">
        <FindSortBar
          data={users}
          storedData={storedUsers.current}
          setData={setUsers}
        />
        {isLoading ? (
          <Loader />
        ) : users.length > 1 ? (
          users
            .filter((usr) => usr.id !== user.id)
            .map((user1, index) => (
              <div key={user1.id} className="flex gap-2">
                {open && (
                  <Modal
                    resetBtnText="Go back"
                    submitBtnText="Delete"
                    runFunction={() => onDelete(user1.id)}
                    onClose={setOpen}
                  >
                    Are you sure you want to delete the user and their tests?
                  </Modal>
                )}
                <Card
                  listNumber={index + 1}
                  title={user1.userName}
                  path={`/admin/users/${user1.id}`}
                  date={user1.creationDate}
                  additional={`Privelegy: ${user1.isAdmin ? "Admin" : "User"}`}
                />
                <Mytip text={"Delete user"}>
                  <Button
                    addStyle="hover:bg-red-700 transition text-lg h-full"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <BsTrash3 />
                  </Button>
                </Mytip>
              </div>
            ))
        ) : (
          <p className="text-slate-700 text-lg"> There is no users</p>
        )}
      </div>
    </div>
  );
}
export default AdminPanel;
