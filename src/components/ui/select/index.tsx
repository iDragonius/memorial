import React, { FC, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import clsx from "clsx";
import { it } from "node:test";
export interface SelectDataProps {
  value: string;
  label: string;
}
export interface SelectProps {
  label: string;
  placeholder: string;
  data: SelectDataProps[];
  selected: SelectDataProps | null;
  onChange: (data: SelectDataProps) => void;
}

const Select: FC<SelectProps> = ({
  label,
  placeholder,
  data,
  selected,
  onChange,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const selectBoxRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(selectBoxRef, () => setOpen(false));
  return (
    <div ref={selectBoxRef} className={"w-full relative"}>
      <div className={""} onClick={() => setOpen((prevState) => !prevState)}>
        <p className={" text-14 font-medium"}>{label}</p>
        <div
          className={
            "cursor-pointer mt-2 flex  h-12 justify-between items-center w-full outline-none placeholder:text-[#A8A8A8] placeholder:font-medium border border-inputBorder rounded-[4px] px-4 py-3 hover:border-primary focus:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:ring-2 focus:ring-primary focus:ring-opacity-70 font-medium trans"
          }
        >
          {selected?.label || placeholder}
          <svg
            className={clsx(isOpen && "rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.71054 11.71L11.3005 14.3C11.6905 14.69 12.3205 14.69 12.7105 14.3L15.3005 11.71C15.9305 11.08 15.4805 10 14.5905 10H9.41054C8.52054 10 8.08054 11.08 8.71054 11.71Z"
              fill="#747474"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={"bg-white absolute mt-3 shadow-xl w-full"}>
          {data.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                if (selected?.value === item.value) {
                  setOpen(false);
                  return;
                }

                onChange(item);
                setOpen(false);
              }}
              className={clsx(
                "px-4 trans hover:text-primary  cursor-pointer py-2 font-medium",
                selected?.value === item.value && "bg-primary bg-opacity-20",
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
