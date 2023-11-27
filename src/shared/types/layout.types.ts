import { NextPage } from "next";
import { LayoutKeys } from "@/components/layouts";
export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";

export type CustomAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};
