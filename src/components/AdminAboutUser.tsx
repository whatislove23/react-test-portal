import Stat from "./Stats";
import TestsPage from "./TestsPage";
import GoBackBtn from "./GoBackBtn";
import { useParams } from "react-router-dom";
import AdminAboutUserCard from "./AdminAboutUserCard";

function AboutUser() {
  const { id } = useParams();
  return (
    <div className="flex flex-col relative pt-5">
      <GoBackBtn className="-top-2" />
      <AdminAboutUserCard id={id} />
      <TestsPage id={id} checkboxVisible={true} />
      <Stat id={id} title="User's statistics" />
    </div>
  );
}
export default AboutUser;
