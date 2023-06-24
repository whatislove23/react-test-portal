import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import Button from "./Button";
import { useState } from "react";

function CreateTest() {
  const [name, setName] = useState("");
  const validationSchema = Yup.object().shape({
    testName: Yup.string().required("Name is required"),
  });
  const handleSubmit = (data: { testName: string }) => {
    setName(data.testName);
  };
  return (
    <div className="px-5 flex flex-col h-full">
      <h1 className="text-3xl text-white text-center my-3">
        {name || "Create new test"}
      </h1>
      {name.length === 0 && (
        <Formik
          initialValues={{ testName: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, values, submitForm }) => (
            <Form className="">
              <div className="flex flex-col items-center gap-2">
                <ErrorMessage
                  name={"testName"}
                  component="div"
                  className=" rounded-lg bg-red-400   bg-opacity-50 p-2 text-white   shadow block "
                />
                <Field
                  type="text"
                  id="testName"
                  name="testName"
                  placeholder="Your test name"
                  className="p-2 rounded-lg  w-full  bg-white bg-opacity-50 shadow  placeholder:text-white  outline-none"
                />
                <Button
                  disabled={!isValid}
                  type="submit"
                  addStyle="hover:scale-100 w-1/5"
                  onClick={submitForm}
                >
                  Set test name
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
export default CreateTest;
