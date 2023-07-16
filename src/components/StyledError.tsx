import { ErrorMessage } from "formik";

function StyledErrorField({ name }: { name: string }) {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="font-bold text-slate-700"
    />
  );
}
export default StyledErrorField;
