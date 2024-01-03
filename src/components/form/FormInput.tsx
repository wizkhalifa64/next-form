import { useField } from "formik";
import { InputText } from "primereact/inputtext";
type Props = {
  name: string;
  label?: string;
  className?: string;
};
const FormInput = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex w-full flex-col gap-2">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <InputText
        {...field}
        className={props.className ? props.className : ""}
      />

      {meta.touched && Boolean(meta.error) && <small>{meta.error}</small>}
    </div>
  );
};

export default FormInput;
