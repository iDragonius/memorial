import React, { FC } from "react";

export interface DelimiterProps {}

const Delimiter: FC<DelimiterProps> = () => {
  return (
    <div className={"w-full flex items-center justify-between gap-3 my-6"}>
      <div className={"w-full h-[1px] bg-[#E3E3E3]"} />
      <span className={"min-w-max text-[#6E6E6E] text-[13px] font-medium"}>
        və ya
      </span>
      <div className={"w-full h-[1px] bg-[#E3E3E3]"} />
    </div>
  );
};

export default Delimiter;
