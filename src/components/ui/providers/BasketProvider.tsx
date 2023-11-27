import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { BasketApi, BasketProps } from "@/lib/api/basket.api";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { useRouter } from "next/router";

export interface BasketProviderProps {
  children: ReactNode;
}
export interface IBasketContext {
  basketData: BasketProps | null;
  setBasketData: Dispatch<SetStateAction<BasketProps | null>>;
  refetch: () => void;
  isFetched: boolean;
  setFetched: Dispatch<SetStateAction<boolean>>;
}
export const BasketContext = createContext<IBasketContext>({
  basketData: null,
  setBasketData: () => {},
  refetch: () => {},
  isFetched: false,
  setFetched: () => {},
});
const BasketProvider: FC<BasketProviderProps> = ({ children }) => {
  const { pathname, push } = useRouter();
  const { userData } = useContext(UserContext);
  const [basketData, setBasketData] = useState<null | BasketProps>(null);
  const [isFetched, setFetched] = useState<boolean>(false);
  const { data: basket, refetch } = useQuery({
    queryKey: ["user-basket"],
    queryFn: BasketApi.getBasket,
    enabled: !!userData,
  });
  useEffect(() => {
    if (basket) {
      if (!basket.data.data && pathname === "/checkout") {
        push("/");
      }

      setBasketData(basket.data.data);
    }
  }, [basket]);
  return (
    <BasketContext.Provider
      value={{ setBasketData, basketData, refetch, isFetched, setFetched }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
