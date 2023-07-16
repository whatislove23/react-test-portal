import { useEffect, useRef } from "react";
import cl from "./Progress.module.css";
type ProgressProps = {
  max: string | number;
  current: string | number;
};
function Progress({ max, current }: ProgressProps) {
  const progresRef = useRef(null);
  useEffect(() => {
    //@ts-ignore
    let finish = progresRef.current.max;
    //@ts-ignore
    let current = progresRef.current.value;
    let currentPercent = Math.round((current / finish) * 100);
    //@ts-ignore
    progresRef.current.style.setProperty("--border", "0px 15px 15px 0px");
    if (currentPercent < 50) {
      //@ts-ignore
      progresRef.current.style.setProperty("--progress-value-color", "#dc2626");
    } else if (currentPercent >= 50 && currentPercent < 100) {
      //@ts-ignore
      progresRef.current.style.setProperty("--progress-value-color", "#facc15");
    } else {
      //@ts-ignore
      progresRef.current.style.setProperty("--progress-value-color", "#16a34a");
      //@ts-ignore
      progresRef.current.style.setProperty("--border", "0px 0px 0px 0px");
    }
  }, [max, current]);
  return (
    <progress
      ref={progresRef}
      className={cl.progress}
      max={max}
      value={current}
    />
  );
}
export default Progress;
