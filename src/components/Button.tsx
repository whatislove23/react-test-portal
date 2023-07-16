import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  addStyle?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({ children, onClick, type, disabled, addStyle }: Props){
  return (
    <button
      disabled={disabled}
      type={`${type || "button"}`}
      onClick={onClick}
      className={` shadow disabled:cursor-not-allowed  disabled:bg-slate-300 disabled:text-slate-800  disabled:hover:text-slate-800 bg-slate-800 py-2 px-4 rounded text-white transition 
       hover:text-slate-50 hover:transition ${
         addStyle ? addStyle : "hover:bg-slate-700"
       } `}
    >
      {children}
    </button>
  );
};
