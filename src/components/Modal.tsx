import Button from "./Button";
import { createPortal } from "react-dom";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

type Props = {
  resetBtnText: string;
  children: ReactNode;
  submitBtnText: string;
  runFunction: () => void;
  onClose: Dispatch<SetStateAction<boolean>>;
};

function Modal({
  children,
  resetBtnText,
  submitBtnText,
  runFunction,
  onClose,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return createPortal(
    <div
      className="bg-slate-700 w-full h-screen overflow-hidden fixed inset-0 flex items-center justify-center bg-opacity-20 my-blur cursor-pointer  z-20"
      onClick={(e) => {
        onClose(false);
      }}
    >
      <div
        className="bg-slate-50 shadow-lg w-3/5 h-64 rounded-lg flex flex-col p-5 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-grow justify-center items-center text-2xl text-slate-700 text-center">
          {children}
        </div>
        <div className="flex w-full justify-center gap-2 ">
          <Button
            onClick={() => {
              runFunction();
              onClose(false);
            }}
          >
            {submitBtnText}
          </Button>
          <Button onClick={() => onClose(false)}>{resetBtnText}</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
