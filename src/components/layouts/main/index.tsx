import React, { FC, ReactNode } from "react";
import Header from "@/components/layouts/main/ui/header";
import Footer from "@/components/layouts/main/ui/footer";
import BranchProvider from "@/components/ui/providers/BranchProvider";
import BasketProvider from "@/components/ui/providers/BasketProvider";
import { useIsFetching } from "@tanstack/react-query";
import { Logo, LogoBig } from "@/components/icons";

export interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  // const fetching = useIsFetching({
  //   queryKey: ["user-profile"],
  // });
  return (
    <BranchProvider>
      <BasketProvider>
        <div className={"min-[1050px]:bg-[#fafafa]"}>
          {/*{!!fetching && (*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      "fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[1000]"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <LogoBig />*/}
          {/*  </div>*/}
          {/*)}*/}
          <div className={"min-h-[calc(100vh-346px)]"}>
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </BasketProvider>
    </BranchProvider>
  );
};

export default MainLayout;
