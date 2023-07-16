import Card from "./Card";
import Mytip from "./Mytip";
import Button from "./Button";
import { toast } from "react-toastify";
import TestsPage from "./TestsPage";
import FindSortBar from "./FindSortBar";
import { getUser } from "../app/userSlice";
import { BsTrash3 } from "react-icons/bs";
import { useAppSelector } from "../app/hooks";
import { IResults } from "../interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { deleteData, fetchData } from "../functions/apiFunctions";
import Loader from "./loader/Loader";

type Props = {
  id?: string;
  title?: string;
};
function Stat({ id, title = "Your statistics" }: Props) {
  const { user } = useAppSelector(getUser);
  const [results, setResults] = useState<IResults[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const storedData = useRef<IResults[]>([]);
  useEffect(() => {
    setLoading(true);
    fetchData(`getUserResults/${user.id}`)
      .then((res) => {
        setResults(res?.data);
        storedData.current = res?.data;
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
      });
  }, [user.id, id]);
  const getAVGGrade = () => {
    return Math.floor(
      results.reduce((prev, item) => prev + item.grade, 0) / results.length
    );
  };
  const onDelete = (id: number) => {
    const loadingToast = toast.loading("Loading...");
    deleteData(`stats/delete/${id}`)
      .then((res) => {
        if (res?.status === 200) {
          toast.dismiss(loadingToast);
          let updatedResults = results.filter((result) => result.id !== id);
          setResults(updatedResults);
          storedData.current = updatedResults;
          toast.success(res.data);
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: false });
      });
  };
  return (
    <div className="flex flex-col h-full ">
      <h1 className="text-3xl text-slate-800 text-center my-3">{title}</h1>
      <div className="flex flex-col  justify-between sm:flex-row">
        <p className="text-2xl text-slate-800">
          Tests passed: <span className="text-red-600">{results.length}</span>
        </p>
        {results.length ? (
          <p className="text-2xl text-slate-800">
            Average grade: <span className="text-red-600">{getAVGGrade()}</span>
            /100
          </p>
        ) : null}
      </div>
      <div>
        <h2 className="text-2xl text-slate-800 text-center my-2 ">Results</h2>
        <FindSortBar
          storedData={storedData.current}
          data={results}
          setData={setResults}
        />
        <div className="mt-2">
          <div className="flex flex-col gap-2 rounded-lg">
            {isLoading ? (
              <Loader />
            ) : results.length ? (
              results?.map((el: IResults, index: number) => {
                return (
                  <div className="flex gap-2" key={el.id}>
                    {open && (
                      <Modal
                        resetBtnText="Go back"
                        submitBtnText="Delete"
                        runFunction={() => onDelete(el.id)}
                        onClose={setOpen}
                      >
                        Are you sure to delete user result ?
                      </Modal>
                    )}
                    <Card
                      date={el.creationDate}
                      title={`${el.title}`}
                      path={`/stats/${el.id}`}
                      listNumber={index + 1}
                      additional={`Grade: ${el.grade}/100`}
                    />
                    {user.isAdmin ? (
                      <Mytip text="Delete result">
                        <Button
                          addStyle="hover:bg-red-700 transition text-lg h-full"
                          onClick={() => setOpen(true)}
                        >
                          <BsTrash3 />
                        </Button>
                      </Mytip>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className="text-slate-700 text-lg">There is no results</p>
            )}
          </div>
        </div>
      </div>
      {id ? null : (
        <div className="mt-2">
          <TestsPage
            path="/results/"
            id={user.id}
            checkboxVisible={true}
            title={"User testing results"}
          />
        </div>
      )}
    </div>
  );
}

export default Stat;
