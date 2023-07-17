import { ErrorMessage } from "formik";

function StyledErrorField({ name }: { name: string }) {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="text-slate-50 bg-red-700  shadow rounded p-2 my-2"
    />
  );
}
export default StyledErrorField;
