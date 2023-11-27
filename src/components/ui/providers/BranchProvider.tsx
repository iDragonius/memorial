import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BranchApi, BranchProps } from "@/lib/api/branch.api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export interface BranchProviderProps {
  children: ReactNode;
}

export interface IBranchContext {
  branchData: BranchProps[] | null;
  setBranchData: Dispatch<SetStateAction<BranchProps[] | null>>;
  selectedBranch: BranchProps | null;
  setSelectedBranch: Dispatch<SetStateAction<BranchProps | null>>;
  branchSelectIsOpen: boolean;
  setBranchSelectOpen: Dispatch<SetStateAction<boolean>>;
}
export const BranchContext = createContext<IBranchContext>({
  branchData: null,
  setBranchData: () => {},
  selectedBranch: null,
  setSelectedBranch: () => {},
  branchSelectIsOpen: false,
  setBranchSelectOpen: () => {},
});
const BranchProvider: FC<BranchProviderProps> = ({ children }) => {
  const { query, pathname, push } = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<BranchProps | null>(
    null,
  );
  const [branchSelectIsOpen, setBranchSelectOpen] = useState<boolean>(false);

  const [branchData, setBranchData] = useState<BranchProps[] | null>(null);
  const { data: branches } = useQuery({
    queryKey: ["branches"],
    queryFn: BranchApi.getBranches,
  });

  useEffect(() => {
    if (branches) {
      setBranchData(branches?.data.data || null);

      const selected = localStorage.getItem("branch");
      if (selected) {
        setSelectedBranch(JSON.parse(selected) as BranchProps);
      } else {
        localStorage.setItem("branch", JSON.stringify(branches.data.data[0]));
        setSelectedBranch(branches.data.data[0]);
      }
      if (pathname === "/branch" && query.branch) {
        const branchFromQuery = branches?.data.data.find(
          (branch) => branch.id === query.branch,
        );
        if (branchFromQuery) {
          setSelectedBranch(branchFromQuery);
        } else {
          push({
            pathname: "/branch",
            query: {
              branch: branches.data.data[0].id,
            },
          });
        }
      }
    }
  }, [branches]);
  return (
    <BranchContext.Provider
      value={{
        branchData,
        setBranchData,
        selectedBranch,
        setSelectedBranch,
        branchSelectIsOpen,
        setBranchSelectOpen,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchProvider;
