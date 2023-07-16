import { Link } from "react-router-dom";

type Props = {
  title: string;
  path: string;
  listNumber: number;
  date: Date;
  additional?: string;
};

export default function Card({
  title,
  path,
  listNumber,
  date,
  additional,
}: Props) {
  const dateInst = new Date(date);
  return (
    <Link
      to={path}
      className="bg-slate-500 text-slate-50 shadow  py-2 px-4 rounded transition hover:bg-slate-700 transition hover:cursor-pointer w-full   grid"
    >
      <p>
        {listNumber}. {title}
      </p>
      {additional ? <p>{additional}</p> : null}
      <p>Date: {dateInst.toLocaleDateString()}</p>
    </Link>
  );
}
