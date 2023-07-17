import Card from "./Card";
import Mytip from "./Mytip";
import Button from "./Button";
import FindSortBar from "./FindSortBar";
import { getUser } from "../app/userSlice";
import { BsTrash3 } from "react-icons/bs";
import { Navigate } from "react-router-dom";
import { ITest } from "../interfaces/interfaces";
import { useAppSelector } from "../app/hooks";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { deleteData, fetchData } from "../functions/apiFunctions.js";
import Loader from "./loader/Loader";

type Props = {
  id?: string;
  checkboxVisible?: boolean;
  path?: string;
  title?: string;
};
export default function TestsPage({ id, checkboxVisible, path, title }: Props) {
  const storedData = useRef<ITest[]>([]);
  const { user } = useAppSelector(getUser);
  const [tests, setTest] = useState<ITest[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchData(`tests/${id}`)
      .then((response) => {
        setTest(response?.data);
        setLoading(false);
        storedData.current = response?.data;
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
      });
  }, [id]);
  const onDelete = async (id: number) => {
    const loadingToast = toast.loading("Loading...");
    deleteData(`tests/delete/${id}`)
      .then(() => {
        let filtered = storedData.current.filter((item) => item.id !== id);
        setTest(filtered);
        storedData.current = filtered;
        toast.dismiss(loadingToast);
        toast.success("Test deleted");
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
        toast.dismiss(loadingToast);
      });
  };
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      <h1 className="text-3xl text-center text-slate-800 mb-3">
        {title || "Tests"}
      </h1>
      <FindSortBar
        storedData={storedData.current}
        data={tests}
        setData={setTest}
        checkboxVisible={checkboxVisible ? false : true}
      />
      <div className="flex flex-col gap-2 mt-2">
        {isLoading ? (
          <Loader />
        ) : tests.length ? (
          tests.map((test, index) => (
            <div className="flex gap-2" key={test.id}>
              {open && (
                <Modal
                  resetBtnText="Go back"
                  submitBtnText="Delete"
                  runFunction={() => onDelete(test.id)}
                  onClose={setOpen}
                >
                  Are you sure to delete this test and all results ?
                </Modal>
              )}
              <Card
                date={test.creationDate}
                title={test.title}
                path={path ? `${path}${test.id}` : `/test/${test.id}`}
                listNumber={index + 1}
              />
              {user.isAdmin || user.id === test.userId ? (
                <Mytip text="Delete test">
                  <Button
                    addStyle="hover:bg-red-700 transition text-lg h-full"
                    onClick={() => setOpen(true)}
                  >
                    <BsTrash3 />
                  </Button>
                </Mytip>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-slate-700 text-lg">There is no tests</p>
        )}
      </div>
    </>
  );
}
