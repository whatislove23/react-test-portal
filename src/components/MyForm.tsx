import Button from "./Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { useState } from "react";
import { UserDataForm } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
type FormProps = {
  head: string;
  buttonText: string;
  buttonTwoText: string;
  func: ({ email, password }: UserDataForm) => void;
  path: string;
};
function MyForm({ head, buttonText, buttonTwoText, func, path }: FormProps) {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = (data: UserDataForm) => {
    func(data);
  };
  return (
    <div className="container mx-auto flex  justify-center items-center gap-5 p-5 h-screen">
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-lg p-4 mx-4 shadow w-1/4 h-auto flex  items-center flex-col shadow">
        <h1 className="text-center text-3xl text-white ">{head}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, values }) => (
            <Form className="h-full mt-5 w-full ">
              <div className="w-full h-full relative flex  flex-col items-center justify-between mb-2">
                <div className="w-full flex flex-col gap-2 mb-2">
                  <ErrorMessage
                    name={"email"}
                    component="div"
                    className=" w-full rounded-lg bg-red-400   bg-opacity-50 p-2 text-white   shadow block "
                  />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 rounded-lg  w-full  bg-white bg-opacity-50 shadow  placeholder:text-white  outline-none"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="password"
                    className=" w-full rounded-lg bg-red-400   bg-opacity-50 p-2 text-white  shadow block"
                    component="div"
                  />
                  <div className="flex shadow rounded-lg">
                    <Field
                      type={isVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="p-2   w-full  bg-white bg-opacity-50  rounded-l-lg  placeholder:text-white outline-none  "
                    />
                    <button
                      onClick={() => setVisible((prev) => !prev)}
                      className="ml-auto text-3xl bg-white bg-opacity-50 px-2 rounded-r-lg text-white hover:text-black transition duration-200 ease-in-out"
                    >
                      {isVisible ? <PiEyeSlashLight /> : <PiEyeLight />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap justify-center w-full">
                  <Button
                    disabled={!isValid}
                    type="submit"
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
