import MyForm from "./MyForm";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { getUser, setUser } from "../app/userSlice";
import { postData } from "../functions/apiFunctions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserDataForm, UserServerData } from "../interfaces/interfaces";

function Auth() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);
  const handleSubmit = (data: UserDataForm) => {
    const loadingToast = toast.loading("Loading...");
    postData("auth/getUser", data)
      .then((res) => {
        if (res !== undefined) {
          dispatch(setUser(res?.data.data as UserServerData));
          toast.dismiss(loadingToast);
          toast.success(res?.data.message);
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
        if (error.response && error.response.status === 401) {
          console.log(error.response.data);
          toast.dismiss(loadingToast);
          toast.error(error.response.data);
        } else {
          toast.error(error.message, { autoClose: false });
          toast.dismiss(loadingToast);
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
