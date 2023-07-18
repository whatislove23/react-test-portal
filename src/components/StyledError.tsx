import { ErrorMessage } from "formik";

function StyledErrorField({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className={`bg-red-600 text-slate-50  shadow rounded p-2 ${className}`}
    />
  );
}
export default StyledErrorField;
