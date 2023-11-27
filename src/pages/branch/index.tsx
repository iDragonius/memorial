import React, { FC, useContext, useEffect } from "react";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import Search from "@/components/screens/branch/Search";
import Services from "@/components/screens/branch/Services";
import Catalog from "@/components/screens/branch/catalog";
import Basket from "@/components/ui/basket";
import { useRouter } from "next/router";
import main from "@/components/layouts/main";
import Head from "next/head";

export interface BranchPageProps {}

const BranchPage: FC<BranchPageProps> = () => {
  const { selectedBranch } = useContext(BranchContext);
  const { push, query, isReady, pathname } = useRouter();
  useEffect(() => {
    if (isReady) {
      if (!query.catalog || !query.branch) {
        push({
          pathname,
          query: {
            ...query,
            branch: selectedBranch?.id,
            catalog: selectedBranch?.catalogTypes[0]?.id,
          },
        });
      }
    }
  }, [query]);
  return (
    <>
      <Head>
        <title>{selectedBranch?.branchLocale[0].name}</title>
      </Head>
      <main>
        <div className={"px-4 sm:px-10 mt-6 flex gap-8"}>
          <div className={"w-full"}>
            <h1
              className={
                "text-secondary  text-20 sm:text-32 font-semibold mb-3"
              }
            >
              {selectedBranch?.branchLocale[0].name}
            </h1>
            <Services />
            <Search />
            <Catalog />
          </div>
          <div className={"max-[1260px]:hidden"}>
            <Basket />
          </div>
        </div>
      </main>
    </>
  );
};

export default BranchPage;
