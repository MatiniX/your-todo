import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  largeLabel?: boolean;
};

const InputField = ({ label, largeLabel = false, ...props }: InputFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id}
        className={
          largeLabel
            ? "block text-lg font-medium text-gray-700"
            : "block text-sm font-medium text-gray-700"
        }
      >
        {label}
      </label>
      <div className="mt-1">
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="mt-1 text-sm text-red-400">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
