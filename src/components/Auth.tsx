import axios from "axios";
import { UserDataForm } from "../interfaces/interfaces";
import MyForm from "./MyForm";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser, setUser } from "../app/userSlice";
import { Navigate } from "react-router-dom";
function Auth() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);
  const handleSubmit = (data: UserDataForm) => {
    axios
      .post("http://localhost:3000/api/auth/getUser", data)
      .then((res) => {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
        if (error.response && error.response.status === 401) {
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
      path="/register"
      head="Sign in"
      buttonText="Sign in"
      buttonTwoText={"Sgn up"}
      func={handleSubmit}
    />
  );
}
export default Auth;
