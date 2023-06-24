import axios from "axios";
import { UserDataForm } from "../interfaces/interfaces";
import MyForm from "./MyForm";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";

function Register() {
  const { user } = useAppSelector(getUser);
  const handleSubmit = (data: UserDataForm) => {
    axios
      .post("http://localhost:3000/api/register/createUser", data)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Handle the 409 Conflict error
          toast.error(error.response.data);
        } else {
          // Handle other errors
          console.log("An error occurred:", error.message);
        }
      });
  };
  if (user.id) {
    return <Navigate to="/tests" replace />;
  }
  return (
    <MyForm
      path="/auth"
      head="Sign up"
      buttonText="Sign up"
      buttonTwoText={"Sign in"}
      func={handleSubmit}
    />
  );
}
export default Register;
