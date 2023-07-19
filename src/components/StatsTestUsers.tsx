import Card from "./Card";
import Button from "./Button";
import { BsTrash3 } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserServerData } from "../interfaces/interfaces";
import GoBackBtn from "./GoBackBtn";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { deleteData, fetchData } from "../functions/apiFunctions";
import Loader from "./loader/Loader";

export default function StatsTestUsers() {
  const { id } = useParams();
  const [data, setData] = useState<UserServerData[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const idres = useRef(0);
  useEffect(() => {
    setLoading(true);
    fetchData(`getUsersByTest/${id}`)
      .then((response) => {
        // console.log(response.data);
        setData(response?.data);
        setLoading(false);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, [id]);
  const onDelete = (id: number) => {
    const loadingToast = toast.loading("Loading...");
    deleteData(`stats/delete/${id}`)
      .then((res) => {
        if (res?.status === 200) {
          let updatedResults = data.filter((result) => result.id !== id);
          setData(updatedResults);
          toast.dismiss(loadingToast);
          toast.success(res.data);
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
        toast.dismiss(loadingToast);
      });
  };
  return (
    <div className="flex flex-col gap-2 relative">
      <GoBackBtn className="-top-2" />
      <h1 className="text-3xl text-slate-800 text-center">
        User tesitng results
      </h1>
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        data.map((user, index) => {
          return (
            <div className=" flex flex gap-2" key={user.id}>
              {open && (
                <Modal
                  resetBtnText="Go back"
                  submitBtnText="Delete"
                  runFunction={() => onDelete(idres.current)}
                  onClose={setOpen}
                >
                  Are you sure to delete this test result ?
                </Modal>
              )}
              <Card
                date={user.creationDate}
                title={`${user.userName}`}
                listNumber={index + 1}
                path={`/stats/${user.id}`}
                additional={`Grade: ${user.grade}/100 `}
              />
              <Button
                addStyle="hover:bg-red-700 transition text-lg"
                onClick={() => {
                  setOpen(true);
                  idres.current = user.id;
                }}
              >
                <BsTrash3 />
              </Button>
            </div>
          );
        })
      ) : (
        <p className="text-slate-700 text-lg">There is no results</p>
      )}
    </div>
  );
}
