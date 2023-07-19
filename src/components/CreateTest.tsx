import * as Yup from "yup";
import Button from "./Button";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { getUser } from "../app/userSlice";
import { RxCross2 } from "react-icons/rx";
import { BsTrash3 } from "react-icons/bs";
import StyledErrorField from "./StyledError";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { IToServer } from "../interfaces/interfaces";
import { postData } from "../functions/apiFunctions";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

function CreateTest() {
  const { user } = useAppSelector(getUser);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    questions: [
      {
        id: uuid(),
        question: "",
        answers: [
          { answer: "", isRight: true, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
        ],
      },
      {
        id: uuid(),
        question: "",
        answers: [
          { answer: "", isRight: true, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
        ],
      },
      {
        id: uuid(),
        question: "",
        answers: [
          { answer: "", isRight: true, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
          { answer: "", isRight: false, id: uuid() },
        ],
      },
    ],
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Test name is required")
      .min(6, "Test name should contain at least 6 letters"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          answers: Yup.array()
            .of(
              Yup.object().shape({
                answer: Yup.string().required("Answer is required"),
                isRight: Yup.boolean().required(
                  "Please select the correct answer"
                ),
              })
            )
            .min(1, "At least one answer must be provided")
            .test(
              "oneCorrectAnswer",
              "Only one answer can be marked as correct",
              (answers) =>
                //@ts-ignore
                answers.filter((answer) => answer.isRight).length === 1
            ),
        })
      )
      .required(),
  });
  const onFormSubmit = (data: IToServer) => {
    const loadingToast = toast.loading("Loading...");
    let dataSave = {
      ...data,
      userId: user.id,
      creationDate: new Date(),
    };
    postData("test/create", dataSave)
      .then((res) => {
        console.log(res);
        navigate("/tests");
        toast.dismiss(loadingToast);
        toast.success(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(loadingToast);
        toast.error(error.message, { autoClose: false });
      });
  };
  return (
    <div className="h-full ">
      <Formik
        validateOnBlur={false}
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onFormSubmit}
      >
        {({
          values,
          isValid,
          resetForm,
          setFieldValue,
          submitForm,
          validateForm,
          errors,
        }) => (
          <Form className="px-5 mx-auto ">
            <h1 className="text-3xl text-slate-700 text-center my-2">
              Test creation
            </h1>

            <div className="">
              <div className=" bg-slate-200 flex flex-col items-center mb-4 p-2 rounded shadow">
                <StyledErrorField name="title" className="w-full mb-2" />
                <Field
                  name="title"
                  placeholder={"Test name"}
                  className={`p-2 rounded w-full bg-slate-50 shadow outline-none placeholder:text-slate-800 $`}
                />
              </div>
              <FieldArray name="questions">
                {({ insert, remove, push }) => {
                  return (
                    <div className="">
                      <div className="flex flex-col  rounded gap-4">
                        {values.questions.map((question, index) => {
                          return (
                            <div
                              key={question.id}
                              className="bg-slate-200 p-2  rounded shadow "
                            >
                              {values.questions.length > 3 && (
                                <RxCross2
                                  onClick={() => remove(index)}
                                  className="ml-auto text-xl text-slate-900 font-bold cursor-pointer  mb-1"
                                />
                              )}
                              <StyledErrorField
                                name={`questions[${index}].question`}
                                className="mb-2"
                              />
                              <Field
                                name={`questions[${index}].question`}
                                placeholder={`${index + 1}. Question `}
                                className={`p-2 rounded w-full bg-slate-50 shadow placeholder:text-slate-800 outline-none h-auto max-h-60`}
                                type="text"
                                as="textarea"
                              />
                              <FieldArray name={`questions[${index}].answers`}>
                                {({ insert, remove, push }) => (
                                  <div className="flex flex-col w-full gap-2 mt-2">
                                    {question.answers.every(
                                      (answer) => answer.isRight === false
                                    ) && (
                                      <p>
                                        {" "}
                                        At least one correct question must be
                                        provided
                                      </p>
                                    )}
                                    {question.answers.map(
                                      (answer, indexans) => {
                                        const handleRadioChange = () => {
                                          const updatedAnswers =
                                            values.questions[index].answers.map(
                                              (answer, answerIndex) => ({
                                                ...answer,
                                                isRight:
                                                  answerIndex === indexans, // Set selected answer to true, others to false
                                              })
                                            );
                                          setFieldValue(
                                            `questions[${index}].answers`,
                                            updatedAnswers
                                          );
                                        };
                                        return (
                                          <div
                                            key={answer.id}
                                            className=" flex flex-col "
                                          >
                                            <StyledErrorField
                                              name={`questions[${index}].answers[${indexans}].answer`}
                                              className="mb-2"
                                            />
                                            <div
                                              className={`flex items-center  rounded shadow overflow-hidden ${
                                                answer.isRight
                                                  ? "bg-green-500"
                                                  : "bg-slate-50"
                                              }`}
                                            >
                                              <StyledErrorField
                                                name={`questions[${index}].answers[${indexans}].isRight`}
                                                className="mb-2"
                                              />
                                              <Field
                                                type="radio"
                                                onChange={handleRadioChange}
                                                name={`questions[${index}].answers[${indexans}].isRight`}
                                                checked={answer.isRight}
                                                className={` m-3`}
                                              />
                                              <Field
                                                className={` w-full p-2 outline-none ${
                                                  answer.isRight
                                                    ? "text-slate-50 placeholder:text-slate-50 bg-green-500 "
                                                    : "bg-slate-50 placeholder:text-slate-800 text-slate-800"
                                                }}`}
                                                type="text"
                                                placeholder={`${
                                                  indexans + 1
                                                }. Answer`}
                                                name={`questions[${index}].answers[${indexans}].answer`}
                                              />
                                              {values.questions[index].answers
                                                .length > 3 && (
                                                <BsTrash3
                                                  className={`  text-2xl mr-3 cursor-pointer  ${
                                                    answer.isRight
                                                      ? "text-slate-50"
                                                      : "text-sate-700"
                                                  }`}
                                                  onClick={() => {
                                                    remove(indexans);
                                                  }}
                                                />
                                              )}
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                    <Button
                                      type="button"
                                      addStyle="font-bold"
                                      onClick={() => {
                                        push({
                                          answer: "",
                                          isRight: false,
                                          id: uuid(),
                                        });
                                      }}
                                    >
                                      +
                                    </Button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          );
                        })}
                        <div className="p-2 bg-slate-200 rounded-t mt-2">
                          <Button
                            type="button"
                            addStyle="w-full"
                            onClick={() => {
                              push({
                                id: uuid(),
                                question: "",
                                answers: [
                                  { answer: "", isRight: true, id: uuid() },
                                  { answer: "", isRight: false, id: uuid() },
                                  { answer: "", isRight: false, id: uuid() },
                                ],
                              });
                            }}
                          >
                            Add question
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </FieldArray>

              <div className="flex justify-center gap-2 bg-slate-200 p-2 pt-0 rounded-b">
                <Button
                  // disabled={!isValid}
                  addStyle="w-full"
                  type="submit"
                  onClick={() => {
                    validateForm();
                    // submitForm();
                  }}
                >
                  Publish
                </Button>
                <Button addStyle="w-full" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTest;
