import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getResult } from "../app/resultsSlice";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { IAnswer, IQuestion } from "../interfaces/interfaces";

function TestResults() {
  const { id } = useParams();
  const [state] = useAppSelector((state: RootState) =>
    getResult(state, Number(id))
  );
  const results = JSON.parse(state.answers);
  const grade = state.grade;
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <h1 className="text-3xl text-white text-center my-3">{state.title}</h1>
      <h2 className="text-xl text-white text-center mb-2">
        Your grade: {grade}/100
      </h2>
      {results.map((question: IQuestion) => (
        <div className="my-2">
          <h3 className="text-2xl text-white text-center mb-2">
            {question.question}
          </h3>

          <div className="rounded bg-white bg-opacity-20 mx-5 p-2 shadow">
            {question.answers.map((item, index) => (
              <div
                className={`rounded bg-white bg-opacity-20 p-2 m-2 shadow text-white ${
                  item.checked && item.isRight
                    ? "bg-green-600 bg-opacity-70"
                    : item.checked && !item.isRight
                    ? "bg-red-600 bg-opacity-70 "
                    : ""
                } `}
              >
                {index + 1}. {item.answer}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default TestResults;
