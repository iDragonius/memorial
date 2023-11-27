import React, { FC, InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextInput: FC<TextInputProps> = ({ label, name, ...rest }) => {
  return (
    <div>
      <label className={" text-14 font-medium"} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className={
          "mt-2 h-12 block w-full outline-none placeholder:text-[#A8A8A8] placeholder:font-medium border border-inputBorder rounded-[4px] px-4 py-3 hover:border-primary focus:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:ring-2 focus:ring-primary focus:ring-opacity-70 font-medium trans"
        }
        {...rest}
      />
    </div>
  );
};

export default TextInput;
