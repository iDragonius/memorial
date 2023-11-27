import React, { FC, ReactNode } from "react";
import clsx from "clsx";

export interface MenuProps {
  children: ReactNode;
  direction?: "right" | "left";
}

const Menu: FC<MenuProps> = ({ children, direction = "right" }) => {
  return (
    <div
      className={clsx(
        "p-2.5 border border-[#E3E3E3] top-10 rounded-[4px] min-w-[167px] flex flex-col gap-2.5 absolute bg-white z-20",
        {
          "right-0": direction === "right",
          "left-0": direction === "left",
        },
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
