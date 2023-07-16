import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import RadioForm from "./RadioForm";
import { getUser } from "../app/userSlice";
import { RxCross2 } from "react-icons/rx";
import Button from "../components/Button";
import Progress from "./Progress/Progress";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { IData, IAnswer } from "../interfaces/interfaces";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Modal from "./Modal";
import { fetchData, postData } from "../functions/apiFunctions";
import Loader from "./loader/Loader";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { user } = useAppSelector(getUser);
  const [data, setData] = useState<IData[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(`test/${id}`)
      .then((response) => {
        const newData = response?.data.map((data: any) => ({
          ...data,
          questions: JSON.parse(data.questions),
        }));
        setData(newData);
        setLoading(false);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, [id]);

  const calculateMark = (): number => {
    const countCheckedRightAnswers = answers.reduce((count, question) => {
      const checkedRightAnswers = question.answers.filter(
        (answer: IAnswer) => answer.isRight && answer.checked
      );
      return count + checkedRightAnswers.length;
    }, 0);
    return Math.round((countCheckedRightAnswers / answers.length) * 100);
  };
  const onSubmit = () => {
    const loadingToast = toast.loading("Loading...");
    let resId = uuidv4();
    resId = resId.replaceAll("-", "");
    let userData = {
      id: resId,
      grade: calculateMark(),
      answers: JSON.stringify(answers),
      testId: Number(id),
      userId: user.id,
      creationDate: new Date(),
    };
    postData(`test/${id}/save`, userData)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Result saved");
        navigate(`/stats/${resId}`);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  };
  const onInputChange = (option: any) => {
    let element = answers.find((item) => item.question === option.question);
    if (!element) {
      setAnswers((prev) => [...prev, option]);
      return;
    }
    let updatedAnswers = answers.map((answer) =>
      answer.question === option.question ? option : answer
    );
    setAnswers(updatedAnswers);
  };
  const leave = () => {
    setAnswers([]);
    navigate("/tests");
  };
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      {open && (
        <Modal
          resetBtnText="Go back"
          submitBtnText="Submit"
          runFunction={onSubmit}
          onClose={setOpen}
        >
          Are you sure to save results ?
        </Modal>
      )}
      {open1 && (
        <Modal
          resetBtnText="Go back"
          submitBtnText="Leave"
          runFunction={leave}
          onClose={setOpen1}
        >
          Are you sure to leave? <br /> Results won't be saved
        </Modal>
      )}
      <Progress max={data[0]?.questions.length} current={answers.length} />
      <div className="flex justify-center items-center h-screen">
        <div
          className="container mx-auto 
        bg-slate-50 rounded-lg p-4 mx-4 shadow"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="flex  justify-between mb-3">
                <RxCross2
                  onClick={() => setOpen1(true)}
                  className="text-2xl text-slate-700 cursor-pointer hover:scale-125 transition ease-in-out"
                />
                <p className="text-2xl text-center text-slate-700 ">
                  {data[0]?.questions[page].question}
                </p>
                <p></p>
              </div>
              <RadioForm
                page={page}
                answers={answers}
                questions={{
                  question: data[0]?.questions[page].question,
                  answers: data[0]?.questions[page].answers,
                }}
                onInputChange={onInputChange}
              />
              <div className="flex flex-col  items-center gap-2 mt-2">
                <div className="flex  justify-center gap-2 w-20">
                  {page > 0 && (
                    <Button
                      addStyle="w-full"
                      onClick={() => {
                        setPage((current) =>
                          current > 0 ? (current -= 1) : 0
                        );
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {page >= data[0]?.questions.length - 1 ? (
                    <Button
                      addStyle="w-full"
                      onClick={() => setOpen(true)}
                      disabled={!(answers.length === page + 1)}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setPage((current) =>
                          current < data[0]?.questions.length - 1
                            ? current + 1
                            : data[0]?.questions.length - 1
                        );
                      }}
                      disabled={
                        !(answers.length === page + 1 || answers.length > page)
                      }
                    >
                      Forward
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
