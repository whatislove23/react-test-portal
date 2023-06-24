import { IAnswer, IData, IQuestion } from "../interfaces/interfaces";

type Props = {
  questions: IQuestion;
  answers: IQuestion[];
  page: number;
  onInputChange: (option: IQuestion) => void;
};
function RadioForm({ questions, onInputChange, answers, page }: Props) {
  return (
    <form className="flex flex-col gap-2">
      {questions.answers?.map((task, index) => {
        const styles = [
          "hover:cursor-pointer bg-white shadow-sm bg-opacity-20 py-2 px-4 flex items-center gap-2 rounded  transition hover:bg-opacity-70 hover:text-gray-800 hover:transition ",
        ];
        let isChecked = answers.some((question) =>
          question.answers.some(
            (answer) =>
              answer.checked &&
              answer.answer === task.answer &&
              question.question == questions.question
          )
        );
        if (isChecked) {
          styles.push("bg-opacity-70 text-gray-800");
        } else {
          styles.push("text-white");
        }
        return (
          <div
            className={styles.join(" ")}
            key={task.answer + page + index}
            onClick={() => {
              let answers = questions.answers.map((question) => {
                if (question.answer == task.answer) {
                  return { ...task, checked: true };
                } else return question;
              });
              onInputChange({ question: questions.question, answers });
            }}
          >
            <input
              type="radio"
              name={task.answer}
              checked={isChecked}
              readOnly
            />
            <label htmlFor={task.answer}>{task.answer}</label>
          </div>
        );
      })}
    </form>
  );
}
export default RadioForm;
