import React, { FC } from "react";
export interface ErrorProps {
  error: string | null;
}

const Error: FC<ErrorProps> = ({ error }) => {
  return <>{error && <p className={"text-red-500 mt-1"}>{error}</p>}</>;
};

export default Error;
