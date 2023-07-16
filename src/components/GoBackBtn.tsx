import { HiBackspace } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

export default function GoBackBtn({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    location.pathname.startsWith("/stats/")
      ? navigate("/tests/")
      : navigate(-1);
  };
  return (
    <HiBackspace
      className={`absolute text-3xl cursor-pointer text-slate-700 hover:text-slate-800 ${
        className && className
      }`}
      onClick={handleBack}
    />
  );
}
