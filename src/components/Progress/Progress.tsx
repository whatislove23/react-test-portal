import cl from "./Progress.module.css";
type ProgressProps = {
  max: string | number;
  current: string | number;
};
function Progress({ max, current }: ProgressProps) {
  return (
    <progress className={cl.progress} max={max} value={current}></progress>
  );
}
export default Progress;
