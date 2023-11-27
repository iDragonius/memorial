import React, { FC } from "react";

export interface PageViewProps {
  currentPage: number;
  pageCount: number;
}

const PageView: FC<PageViewProps> = ({ currentPage, pageCount }) => {
  return (
    <p className={"font-medium text-[#747474] mb-3 max-[1000px]:text-center"}>
      {" "}
      Səhifə {currentPage + "/" + pageCount}{" "}
    </p>
  );
};

export default PageView;
