import * as Yup from "yup";
import Button from "./Button";
import { useState } from "react";
import StyledErrorField from "./StyledError";
import { useNavigate } from "react-router-dom";
import { UserDataForm } from "../interfaces/interfaces";
import { Formik, Form, Field } from "formik";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

type Props = {
  head: string;
  buttonText: string;
  buttonTwoText: string;
  func: (data: UserDataForm) => void;
  path: string;
  register?: boolean;
};

function MyForm({
  head,
  buttonText,
  buttonTwoText,
  func,
  path,
  register,
}: Props) {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState<boolean>(false);
  const handleSubmit = (data: UserDataForm) => {
    func(data);
  };

  const validationSchema = Yup.object().shape(
    register
      ? {
          firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name should be at least 2 characters"),
          lastName: Yup.string()
            .required("Last name is required")
            .min(6, "First name should be at least 6 characters"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }
      : {
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }
  );

  const intitialValues = {
    email: "",
    password: "",
  };
  let values = register
    ? { ...intitialValues, firstName: "", lastName: "" }
    : intitialValues;

  return (
    <div className="container mx-auto flex  justify-center items-center p-5 h-screen ">
      <div className="bg-slate-50 rounded-lg p-5 mx-4 sm:w-1/4 h-auto flex  items-center flex-col shadow ">
        <h1 className="text-center text-3xl text-slate-700 ">{head}</h1>
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, values, submitForm }) => (
            <Form className="h-full mt-5 w-full ">
              <div className="w-full h-full relative flex  flex-col items-center justify-between">
                <div className="w-full flex flex-col gap-3">
                  <StyledErrorField name={"email"} />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 rounded-lg  w-full  bg-slate-300  shadow  placeholder:text-slate-800 outline-none"
                    autoComplete="off"
                  />
                  {register ? (
                    <>
                      <StyledErrorField name={"firstName"} />
                      <Field
                        type="firstName"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        className="p-2 rounded-lg  w-full  bg-slate-300  shadow  placeholder:text-slate-800 outline-none"
                        autoComplete="off"
                      />
                      <StyledErrorField name={"lastName"} />
                      <Field
                        type="lastName"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        className="p-2 rounded-lg  w-full  bg-slate-300  shadow  placeholder:text-slate-800 outline-none"
                        autoComplete="off"
                      />
                    </>
                  ) : null}

                  <StyledErrorField name="password" />
                  <div className="flex shadow rounded-lg">
                    <Field
                      type={isVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="p-2  w-full  bg-slate-300  rounded-l-lg rounded-r-none  placeholder:text-slate-800 outline-none  "
                    />
                    <button
                      type="button"
                      onClick={() => setVisible((prev) => !prev)}
                      className="ml-auto text-3xl bg-slate-300 px-2 rounded-r-lg text-slate-800  "
                    >
                      {isVisible ? <PiEyeSlashLight /> : <PiEyeLight />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap justify-center w-full mt-3">
                  <Button
                    disabled={!isValid}
                    onClick={submitForm}
                    addStyle="flex-grow"
                  >
                    {buttonText}
                  </Button>
                  <Button
                    addStyle="flex-grow"
                    onClick={() => {
                      navigate(path);
                    }}
                  >
                    {buttonTwoText}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default MyForm;
