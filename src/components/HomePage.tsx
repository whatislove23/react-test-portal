import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";
import Menu from "./Menu";

function HomePage() {
  const { user } = useAppSelector(getUser);
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto my-5 flex flex-col sm:flex-row min-h-screen max-h-full gap-2">
      <div className="hidden sm:block ml-2 ">
        <Menu small={true} />
      </div>
      <main className="bg-slate-50 w-full rounded-lg sm:shadow  p-5  mr-2">
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
