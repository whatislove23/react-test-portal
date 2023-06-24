import { Link } from "react-router-dom";

type Props = {
  title: string;
  path: string;
  listNumber: number;
};
export default ({ title, path, listNumber }: Props) => {
  return (
    <Link
      to={path}
      className="shadow bg-white bg-opacity-20 py-2 px-4 rounded text-white transition hover:bg-opacity-70 hover:text-gray-800 hover:transition hover:cursor-pointer w-full rounded-lg flex  items-center"
    >
      {listNumber}. {title}
    </Link>
  );
};
