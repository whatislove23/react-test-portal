import { PiStudentBold } from "react-icons/pi";
import { LuAlignJustify } from "react-icons/lu";
import Menu from "./Menu";
import { useState } from "react";

function Header() {
  const [isOpen, setOpen] = useState(false);

  isOpen
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");
  return (
    <header className=" bg-slate-900 text-slate-50 shadow relative">
      <div className="container mx-auto  flex items-center h-10 justify-between">
        <PiStudentBold className=" text-slate-50 text-3xl ml-2" />
        <div className="flex items-center gap-2">
          <LuAlignJustify
            className=" text-slate-50 text-2xl  cursor-pointer mr-2"
            onClick={() => setOpen((p) => !p)}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute w-full bg-opacity-20 my-blur bg-slate-800 cursor-pointer z-10 h-screen"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <Menu onClose={setOpen} />
        </div>
      )}
    </header>
  );
}
export default Header;
