import { Tooltip } from "react-tooltip";
import React, { ReactNode } from "react";
import "react-tooltip/dist/react-tooltip.css";

type Props = {
  children: ReactNode;
  text: string;
};

function Mytip({ children, text }: Props) {
  return (
    <>
      <p data-tooltip-id="my-tooltip" data-tooltip-content={text}>
        {children}
      </p>
      <Tooltip
        style={{ backgroundColor: "#f8fafc", color: "#1e293b" }}
        id="my-tooltip"
        className="shadow-lg"
      />
    </>
  );
}

export default Mytip;
