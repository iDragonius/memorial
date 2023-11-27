import { useContext, useEffect } from "react";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { userData, isError } = useContext(UserContext);
  const { push } = useRouter();
  useEffect(() => {
    if (!userData?.id && !localStorage.getItem("token")) {
      push("/");
    }
  }, [userData, isError]);
};
