import React, { FC, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { BranchContext } from "@/components/ui/providers/BranchProvider";
import { useRouter } from "next/router";
import { BranchProps } from "@/lib/api/branch.api";
import Branches from "@/components/screens/branch-info/Branches";
import BranchInfo from "@/components/screens/branch-info/BranchInfo";
import CustomLoader from "@/components/ui/loader/CustomLoader";

export interface BranchInfoPageProps {}

const BranchInfoPage: FC<BranchInfoPageProps> = () => {
  const { branchData } = useContext(BranchContext);
  const { query, isReady, pathname, push } = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<BranchProps | null>(
    null,
  );
  useEffect(() => {
    if (branchData) {
      if (query.branch) {
        const branch = branchData?.find((el) => el.id === query.branch);
        if (branch) {
          setSelectedBranch(branch);
        }
      } else {
        push({
          pathname,
          query: {
            branch: branchData[0].id,
          },
        });
      }
    }
  }, [isReady, query, branchData]);
  return (
    <>
      <Head>
        <title>Filiallarımız</title>
      </Head>
      <main className={"box"}>
        <h1
          className={
            "text-24 sm:text-40 text-bgSecondary font-semibold my-4 sm:my-8"
          }
        >
          Filiallarımız
        </h1>
        {selectedBranch ? (
          <>
            <Branches
              branches={branchData}
              setSelectedBranch={setSelectedBranch}
              selectedBranch={selectedBranch}
            />
            {selectedBranch && <BranchInfo data={selectedBranch} />}
          </>
        ) : (
          <div className={" rounded-[12px] h-[300px]"}>
            <CustomLoader />
          </div>
        )}
      </main>
    </>
  );
};

export default BranchInfoPage;
