import MyForm from "./MyForm";
import { toast } from "react-toastify";
import { getUser, setUser } from "../app/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserDataForm, UserServerData } from "../interfaces/interfaces";
import { postData } from "../functions/apiFunctions";

function Register() {
  const { user } = useAppSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (data: UserDataForm) => {
    const { email, password, firstName, lastName } = data;
    const loadingToast = toast.loading("Loading...");
    const res = {
      email,
      password,
      userName: `${firstName?.trim()} ${lastName?.trim()}`,
      creationDate: new Date(),
    };
    postData("register/createUser", res)
      .then((res) => {
        dispatch(setUser(res?.data[0] as UserServerData));
        navigate("/tests");
        toast.dismiss(loadingToast);
        toast.success("User created");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error(error.response.data);
          toast.dismiss(loadingToast);
        } else {
          toast.error(error.message, { autoClose: false });
          console.log(error);
          toast.dismiss(loadingToast);
        }
      });
  };
  user.id ? <Navigate to="/tests" replace /> : <Navigate to="/auth" replace />;
  return (
    <MyForm
      path="/auth"
      head="Sign up"
      buttonText="Sign up"
      buttonTwoText={"Sign in"}
      func={handleSubmit}
      register={true}
    />
  );
}
export default Register;
