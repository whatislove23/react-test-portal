import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  addStyle?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
export default ({ children, onClick, type, disabled, addStyle }: Props) => {
  return (
    <button
      disabled={disabled}
      type={`${type || "button"}`}
      onClick={onClick}
      className={` ${
        addStyle ? addStyle : " "
      }  shadow disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-opacity-20 disabled:hover:text-white bg-white bg-opacity-20 py-2 px-4 rounded text-white transition hover:scale-105 hover:bg-opacity-70 hover:text-gray-800 hover:transition `}
    >
      {children}
    </button>
  );
};
