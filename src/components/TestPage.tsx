import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { IData, IAnswer } from "../interfaces/interfaces";
import RadioForm from "./RadioForm";
import Button from "../components/Button";
import Progress from "./Progress/Progress";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";
import { toast } from "react-toastify";

function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData[]>([]);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const { user } = useAppSelector(getUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/test/${id}`
        );
        //@ts-ignore
        const newData = response.data.map((data) => ({
          ...data,
          questions: JSON.parse(data.questions),
        }));
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
    if (window.confirm("Отправить форму?")) {
      let grade = calculateMark();
      let userData = {
        answers: JSON.stringify(answers),
        testId: Number(id),
        grade,
        userId: user.id,
      };
      axios
        .post(`http://localhost:3000/api/test/${id}/save`, userData)
        .then((response) => {
          navigate("/tests");
          toast.success(response.data);
        })
        .catch((error) => {
          console.error("Помилка при виконанні POST-запиту:", error.message);
        });
    }
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
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="container mx-auto 
        bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-lg p-4 mx-4 shadow"
      >
        <Progress
          max={data[0]?.questions[page].answers.length}
          current={answers.length}
        />
        <p className="text-2xl text-center text-white mb-3">
          {data[0]?.questions[page].question}
        </p>
        <RadioForm
          page={page}
          answers={answers}
          questions={{
            question: data[0]?.questions[page].question,
            answers: data[0]?.questions[page].answers,
          }}
          onInputChange={onInputChange}
        />
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex  justify-center gap-5 ">
            {page > 0 && (
              <Button
                onClick={() => {
                  setPage((current) => (current > 0 ? (current -= 1) : 0));
                }}
              >
                Back
              </Button>
            )}
            {page >= data[0]?.questions.length - 1 ? (
              <Button
                onClick={onSubmit}
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
      </div>
    </div>
  );
}

export default TestPage;
