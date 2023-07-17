import { IQuestion } from "../interfaces/interfaces";

type Props = {
  page: number;
  questions: IQuestion;
  answers: IQuestion[];
  onInputChange: (option: IQuestion) => void;
};

function RadioForm({ questions, answers, page, onInputChange }: Props) {
  return (
    <form className="flex flex-col gap-2">
      {questions.answers?.map((task, index) => {
        const styles =
          " bg-slate-300 hover:cursor-pointer  shadow py-2 px-4 flex items-center gap-2 rounded  hover:bg-slate-700 hover:text-slate-50 transition ".split(
            " "
          );
        let isChecked = answers.some((question) =>
          question.answers.some(
            (answer) =>
              answer.checked &&
              answer.answer === task.answer &&
              question.question === questions.question
          )
        );
        isChecked ? styles.push("bg-slate-800 text-slate-50") : styles.push("");
        return (
          <div
            className={styles.join(" ")}
            key={task.answer + page + index}
            onClick={() => {
              let answers = questions.answers.map((question) => {
                return question.answer === task.answer
                  ? { ...task, checked: true }
                  : question;
              });
              onInputChange({ question: questions.question, answers });
            }}
          >
            <div className="flex  gap-2 items-center">
              <div className="w-5">
                <input
                  type="radio"
                  name={task.answer}
                  checked={isChecked}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor={task.answer}>{task.answer}</label>
              </div>
            </div>
          </div>
        );
      })}
    </form>
  );
}
export default RadioForm;
