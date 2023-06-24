import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../app/userSlice";
import { useNavigate, Navigate, Outlet, Link } from "react-router-dom";

interface ITest {
  id: number;
  testId: number;
  title: string;
}
function TestsPage() {
  const { user } = useAppSelector(getUser);

  const [tests, setTest] = useState<ITest[]>([]);

  useEffect(() => {
    console.log(user);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tests");
        setTest(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  if (!user.id) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="w-full p-5">
      <h1 className="text-3xl text-white text-center my-3">
        Tests avaliable for you
      </h1>
      <div className="flex flex-col gap-3 justify-center">
        {tests.map((test, index) => (
          <Card
            title={test.title}
            path={`/test/${test.id}`}
            key={test.id}
            listNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
export default TestsPage;
