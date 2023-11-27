import React, { ButtonHTMLAttributes, FC } from "react";
import { clsx } from "clsx";

export interface ConditionalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  label: string;
}

const ConditionalButton: FC<ConditionalButtonProps> = ({
  disabled,
  label,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "py-3 px-6 w-full rounded-[4px] font-medium focus:outline-none ",
        disabled
          ? "text-[#BBBBBB] bg-[#F2F2F2]"
          : "trans bg-primary text-white hover:ring-4 hover:ring-primary hover:ring-opacity-70  focus:ring-4 focus:ring-primary focus:ring-opacity-70",
      )}
      {...rest}
    >
      {label}
    </button>
  );
};

export default ConditionalButton;
