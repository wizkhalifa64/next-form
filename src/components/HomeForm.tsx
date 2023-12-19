"use client";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { Fragment, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
type Inputs = {
  userName: string;
  email: string;
  password: string;
  compPassword: string;
  dob: Date | null;
  bio: string;
  gender: string;
  termsCondition: boolean;
};
type GenderElm = { name: string; key: string };
const HomeForm = () => {
  const [check, setCheck] = useState<boolean>(false);
  const schema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[a-zA-Z0-9_]{3,15}$/, "3-15 chars,alphanumeric")
      .required("Username is required"),
    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&*? "]).*$/,
        "Min 8 char,One Uppercase,special char"
      )
      .required("Password is required"),
    dob: Yup.date()
      .test({
        test: (dob) =>
          !!dob && new Date().getFullYear() - new Date(dob).getFullYear() > 18,
        message: "Age should be 18+",
      })
      .required("Date Of Birth is required"),
    compPassword: Yup.string() // yup latest version issue, have to check change log
      .when("dob", (dob, schema) => {
        return schema.test({
          test: (comp) => {
            return !!dob[0] && comp !== dob[0];
          },
          message: "Password Did not match",
        });
      })
      .required("This Field is required"),
    bio: Yup.string().nullable(),
    gender: Yup.string().required("Gender is required"),
  });
  const {
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors, touchedFields },
  } = useForm<any>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      dob: null,
      bio: "",
      gender: "",
      termsCondition: false,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  const gender: GenderElm[] = [
    { name: "Male", key: "M" },
    { name: "Female", key: "F" },
    { name: "Other", key: "O" },
  ];
  return (
    <div className="container px-20 py-10 flex items-center justify-center">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="userName"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <span className="p-float-label">
                <InputText
                  {...field}
                  name={field.name}
                  value={field.value}
                  className={"w-full"}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor="userName">Username</label>
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <span className="p-float-label">
                <InputText {...field} className="w-full" />
                <label htmlFor="email">Email</label>
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <span className="p-float-label w-full">
                <Password
                  {...field}
                  feedback={false}
                  className="w-full"
                  header={header}
                  footer={footer}
                  toggleMask
                />
                <label htmlFor="password">Password</label>
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="compPassword"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <span className="p-float-label w-full">
                <Password
                  {...field}
                  feedback={false}
                  className="w-full"
                  header={header}
                  footer={footer}
                  toggleMask
                />
                <label htmlFor="compPassword">Compare Password</label>
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="dob"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <span className="p-float-label">
                <Calendar
                  {...field}
                  className="w-full"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/mm/yy"
                />
                <label htmlFor={field.name}>Birth Date</label>
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />{" "}
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <div>Gender</div>

              <div className="flex align-items-center">
                {gender.map((elm: GenderElm) => (
                  <Fragment key={elm.name}>
                    <RadioButton
                      {...field}
                      inputRef={field.ref}
                      value={elm.key}
                      checked={field.value === elm.key}
                    />
                    <label htmlFor="f5" className="ml-1 mr-3">
                      {elm.name}
                    </label>
                  </Fragment>
                ))}
              </div>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <div className="col-span-2">
              <span className="p-float-label">
                <label htmlFor={field.name}>Bio</label>
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={4}
                  className={
                    classNames({ "p-invalid": fieldState.error }) + "w-full"
                  }
                />
              </span>
              {Boolean(fieldState.error?.message) && (
                <p
                  className={classNames(
                    {
                      "p-invalid": Boolean(fieldState.error?.message),
                    },
                    "text-xs"
                  )}
                >{`${fieldState.error?.message}`}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="termsCondition"
          control={control}
          render={({ field, fieldState }) => (
            <div className="col-span-2 flex gap-2">
              <Checkbox
                {...field}
                name={field.name}
                checked={field.value}
                inputRef={field.ref}
                value={field.value}
                className={classNames({ "p-invalid": fieldState.error })}
                onChange={(e) => {
                  field.onChange(e.checked);
                  setCheck(e.checked ? true : false); //undefiend issue
                }}
              />
              <label htmlFor={field.name}>Terms and condition</label>
            </div>
          )}
        />
        <Button
          //   disabled={!getValues("termsCondition")}
          disabled={!check}
          label="Save"
          className="w-full col-span-2"
          type="submit"
        />
        <Button
          label="Reset"
          onClick={() => {
            reset();
            setCheck(false);
          }}
          className="w-full col-span-2"
          type="button"
        />
      </form>
    </div>
  );
};

export default HomeForm;
