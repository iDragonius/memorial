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
import { GenderTypes } from "@/shared/types/gender.types";
import { useQuery } from "@tanstack/react-query";
import { UserApi, UserFamilyMemberProps } from "@/lib/api/user.api";

export interface UserProviderProps {
  children: ReactNode;
}
export interface IUserContext {
  userData: UserProps | null;
  setUserData: Dispatch<SetStateAction<UserProps | null>>;
  isUserFetched: boolean;
  isError: boolean;
  refetch: () => void;
  userFamilyMembersData: UserFamilyMemberProps[];
  setUserFamilyMembersData: Dispatch<SetStateAction<UserFamilyMemberProps[]>>;
  refetchFamilyMembers: () => void;
}
export interface UserProps {
  id: string;
  email: string;
  phone: string;
  role: string;
  isPhoneVerified: boolean;
  photo: {
    id: string;
  };
  createdAt: string;
  name: string;
  surname: string;
  fatherName: string;
  gender: GenderTypes;
  birthday: string;
  userId: string;
}

export const UserContext = createContext<IUserContext>({
  userData: null,
  setUserData: () => {},
  isUserFetched: false,
  isError: false,
  refetch: () => {},
  userFamilyMembersData: [],
  setUserFamilyMembersData: () => {},
  refetchFamilyMembers: () => {},
});
const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [userFamilyMembersData, setUserFamilyMembersData] = useState<
    UserFamilyMemberProps[]
  >([]);
  const {
    data: user,
    refetch,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: UserApi.getUserProfile,
  });
  const { data: userFamilyMembers, refetch: refetchFamilyMembers } = useQuery({
    queryKey: ["user-family-members"],
    queryFn: UserApi.getUserFamilyMembers,
    enabled: !!user?.data.data.id,
  });
  useEffect(() => {
    if (user) {
      setUserData(user.data.data);
    }
  }, [user]);
  useEffect(() => {
    if (userFamilyMembers) {
      setUserFamilyMembersData(userFamilyMembers.data.data);
    }
  }, [userFamilyMembers]);
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        refetch,
        isUserFetched: isFetched,
        userFamilyMembersData,
        setUserFamilyMembersData,
        refetchFamilyMembers: refetchFamilyMembers,
        isError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
