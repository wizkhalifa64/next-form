import { useField } from "formik";
import { InputText } from "primereact/inputtext";
type Props = {
  name: string;
  label: string;
  className?: string;
};
const FormInputFloat = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="p-float-label">
        <InputText
          {...field}
          style={{ width: "100%" }}
          className={props.className ? props.className : ""}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </span>
      <small>{meta.touched && Boolean(meta.error) && meta.error}</small>
    </div>
  );
};

export default FormInputFloat;
