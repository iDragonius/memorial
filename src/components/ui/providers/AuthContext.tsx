import React, { createContext, FC, ReactNode, useState } from "react";
import exp from "constants";

export interface AuthContextProps {
  children: ReactNode;
}
export interface IAuthContextData {
  phone: string;
  otpId: string;
  redirectedToRegister: boolean;
}
export interface AuthContextDataProps {
  data: IAuthContextData;
  setData: React.Dispatch<React.SetStateAction<IAuthContextData>>;
}
export const AuthContextData = createContext<AuthContextDataProps | null>(null);
const AuthContext: FC<AuthContextProps> = ({ children }) => {
  const [data, setData] = useState<IAuthContextData>({
    phone: "",
    otpId: "",
    redirectedToRegister: false,
  });
  return (
    <AuthContextData.Provider value={{ data, setData }}>
      {children}
    </AuthContextData.Provider>
  );
};

export default AuthContext;
