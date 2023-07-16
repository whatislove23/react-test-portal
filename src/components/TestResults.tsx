import GoBackBtn from "./GoBackBtn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IQuestion } from "../interfaces/interfaces";
import { fetchData } from "../functions/apiFunctions";
import { toast } from "react-toastify";

interface IUserResult {
  answers: string;
  creationDate: Date;
  grade: number;
  id: number;
  title: string;
  userName: string;
}

export default function TestResults() {
  const { id } = useParams();
  const [[state], setState] = useState<IUserResult[]>([]);
  useEffect(() => {
    fetchData(`getUserResultsByTest/${id}`)
      .then((res) => {
        setState(res?.data);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, [id]);

  return (
    <div className="relative">
      <GoBackBtn className="-top-5" />
      <h1 className="text-3xl text-slate-800 text-center my-3">
        {state?.title}
      </h1>
      <h2 className="text-xl text-slate-700 text-center mb-3">
        {state?.userName} result
      </h2>
      <h2 className="text-xl text-slate-800 text-center mb-2">
        Grade: <span className="text-red-600">{state?.grade}</span>/100
      </h2>
      {state &&
        JSON.parse(state?.answers).map((question: IQuestion) => {
          return (
            <div className="my-2" key={question.question}>
              <h3 className="text-2xl text-slate-800 text-center mb-2">
                {question.question}
              </h3>
              <div className="rounded bg-slate-200  mx-5 p-2 shadow">
                {question.answers.map((item, index) => {
                  const styles = "rounded  p-2 m-2 shadow ".split(" ");
                  item.checked && item.isRight
                    ? styles.push(" bg-green-600 text-slate-50")
                    : item.checked && !item.isRight
                    ? styles.push(" bg-red-600 text-slate-50")
                    : styles.push("bg-slate-50 text-slate-700");

                  return (
                    <div key={index} className={styles.join(" ")}>
                      {index + 1}. {item.answer}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
