import React, { useContext, useRef, useState } from "react";
import Head from "next/head";
import { CustomPage } from "@/shared/types/layout.types";
import { UserContext } from "@/components/ui/providers/UserProvider";
import Title from "@/components/screens/profile/Back";
import {
  ProfileInfoIcon,
  ProfileMoreIcon,
  ProfileNoFamilyIcon,
} from "@/components/icons/profile";
import FamilyMemberModal, {
  FamilyMemberProps,
} from "@/components/ui/modals/FamilyMemberModal";
import ProfileLayout from "@/components/layouts/profile";
import { UserApi, UserFamilyMemberProps } from "@/lib/api/user.api";
import Menu from "@/components/ui/menu";
import { useOnClickOutside } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";
import { ShowError } from "@/utils/show-error";
import CustomLoader from "@/components/ui/loader/CustomLoader";
import toast from "react-hot-toast";
import { gendersData } from "@/components/ui/gender-select/genders.data";

export interface FamilyMembersPageProps {}

const FamilyMembersPage: CustomPage<FamilyMembersPageProps> = () => {
  const { userFamilyMembersData, refetchFamilyMembers } =
    useContext(UserContext);
  const [isFamilyMemberModalOpen, setFamilyMemberModalOpen] =
    useState<boolean>(false);
  const [updateData, setUpdateData] = useState<null | {
    data: FamilyMemberProps;
    id: string;
  }>(null);
  const updateUserFamilyMember = (data: {
    data: FamilyMemberProps;
    id: string;
  }) => {
    setUpdateData(data);
    setFamilyMemberModalOpen(true);
  };
  return (
    <ProfileLayout>
      {isFamilyMemberModalOpen && (
        <FamilyMemberModal
          close={() => setFamilyMemberModalOpen(false)}
          update={updateData}
          setUpdate={setUpdateData}
        />
      )}
      <Head>
        <title>Ailə üzvlərin</title>
      </Head>
      <main
        className={"bg-white nb:border border-[#E3E3E3] w-full py-6 nb:px-8 "}
      >
        <Title label={"Ailə üzvlərim"} />

        {!!userFamilyMembersData.length ? (
          <div>
            {userFamilyMembersData.map((familyMember) => (
              <FamilyMemberItem
                familyMember={familyMember}
                key={familyMember.id}
                refetch={refetchFamilyMembers}
                update={updateUserFamilyMember}
              />
            ))}
            <div className={"flex justify-end"}>
              <button
                onClick={() => setFamilyMemberModalOpen(true)}
                className={
                  "flex items-center gap-2.5 float-right h-14 justify-center border-[#E3E3E3] border px-4 mt-6 rounded-[4px] trans text-primary hover:border-primary"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 20.9999H10C10.2652 20.9999 10.5196 20.8946 10.7071 20.707C10.8946 20.5195 11 20.2651 11 19.9999C11 19.7347 10.8946 19.4803 10.7071 19.2928C10.5196 19.1053 10.2652 18.9999 10 18.9999H3.071C3.31366 17.3347 4.14714 15.8124 5.41925 14.7108C6.69136 13.6093 8.31724 13.002 10 12.9999C11.1775 13.0101 12.3214 12.6081 13.2336 11.8634C14.1457 11.1187 14.7686 10.0784 14.9943 8.92271C15.2199 7.76701 15.0341 6.56878 14.4691 5.53569C13.904 4.5026 12.9953 3.69975 11.9005 3.26629C10.8057 2.83283 9.59368 2.79608 8.47459 3.1624C7.3555 3.52871 6.39984 4.27502 5.77322 5.27197C5.14661 6.26892 4.88855 7.45369 5.04375 8.62094C5.19895 9.78818 5.75765 10.8643 6.623 11.6629C4.96321 12.3362 3.54177 13.489 2.54021 14.974C1.53864 16.459 1.00242 18.2088 1 19.9999C1 20.2651 1.10536 20.5195 1.29289 20.707C1.48043 20.8946 1.73478 20.9999 2 20.9999ZM10 4.99992C10.5933 4.99992 11.1734 5.17587 11.6667 5.50551C12.1601 5.83516 12.5446 6.30369 12.7716 6.85187C12.9987 7.40005 13.0581 8.00325 12.9424 8.58519C12.8266 9.16713 12.5409 9.70168 12.1213 10.1212C11.7018 10.5408 11.1672 10.8265 10.5853 10.9423C10.0033 11.058 9.40013 10.9986 8.85195 10.7716C8.30377 10.5445 7.83524 10.16 7.50559 9.66663C7.17595 9.17328 7 8.59326 7 7.99992C7 7.20427 7.31607 6.44121 7.87868 5.8786C8.44129 5.31599 9.20435 4.99992 10 4.99992ZM23 15.9999C23 16.2651 22.8946 16.5195 22.7071 16.707C22.5196 16.8946 22.2652 16.9999 22 16.9999H19V19.9999C19 20.2651 18.8946 20.5195 18.7071 20.707C18.5196 20.8946 18.2652 20.9999 18 20.9999C17.7348 20.9999 17.4804 20.8946 17.2929 20.707C17.1054 20.5195 17 20.2651 17 19.9999V16.9999H14C13.7348 16.9999 13.4804 16.8946 13.2929 16.707C13.1054 16.5195 13 16.2651 13 15.9999C13 15.7347 13.1054 15.4803 13.2929 15.2928C13.4804 15.1053 13.7348 14.9999 14 14.9999H17V11.9999C17 11.7347 17.1054 11.4803 17.2929 11.2928C17.4804 11.1053 17.7348 10.9999 18 10.9999C18.2652 10.9999 18.5196 11.1053 18.7071 11.2928C18.8946 11.4803 19 11.7347 19 11.9999V14.9999H22C22.2652 14.9999 22.5196 15.1053 22.7071 15.2928C22.8946 15.4803 23 15.7347 23 15.9999Z"
                    fill="#099B87"
                  />
                </svg>
                <span>Ailə üzvü artır</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={"py-20 flex flex-col gap-6 items-center justify-center"}
          >
            <ProfileNoFamilyIcon />
            <h3 className={"text-18 text-[#505050] font-medium"}>
              Ailə üzvlərinizi daxil etməmisiz
            </h3>
            <button
              className={
                "bg-primary flex items-center gap-2.5 rounded-[4px] text-white h-14  py-3 px-6 trans hover:ring-4 hover:ring-primary hover:ring-opacity-70 outline-none focus:ring-primary focus:right-4 focus:ring-opacity-70"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 17V13H7C6.73478 13 6.48043 12.8946 6.29289 12.7071C6.10536 12.5196 6 12.2652 6 12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H11V7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13H13V17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17Z"
                  fill="white"
                />
              </svg>
              <span
                className={"font-medium"}
                onClick={() => setFamilyMemberModalOpen(true)}
              >
                Ailə üzvülərini artır
              </span>
            </button>
          </div>
        )}
      </main>
    </ProfileLayout>
  );
};

const FamilyMemberItem = ({
  familyMember,
  refetch,
  update,
}: {
  familyMember: UserFamilyMemberProps;
  refetch: () => void;
  update: (data: { data: FamilyMemberProps; id: string }) => void;
}) => {
  const [isActionsOpen, setActionsOpen] = useState<boolean>(false);
  const {
    mutateAsync: deleteUserFamilyMemberFunc,
    isPending: deleteUserFamilyMemberPending,
  } = useMutation({
    mutationFn: UserApi.deleteUserFamilyMember,
  });
  const {
    mutateAsync: updateUserFamilyMemberFunc,
    isPending: updateUserFamilyMemberPending,
  } = useMutation({
    mutationFn: UserApi.updateUserFamilyMember,
  });
  const deleteUserFamilyMember = (id: string) => {
    setActionsOpen(false);

    deleteUserFamilyMemberFunc(id)
      .then((res) => {
        if (res.data.success) {
          refetch();
          toast.success(
            `${
              familyMember.name + " " + familyMember.surname
            } adlı ailə üzvü uğurla silindi!`,
          );
        }
      })
      .catch((err) => ShowError(err));
  };
  const updateUserFamilyMember = () => {
    setActionsOpen(false);
    update({
      id: familyMember.id,
      data: {
        name: familyMember.name,
        surname: familyMember.surname,
        fatherName: familyMember.fatherName,
        birthday: familyMember.birthday,
        gender:
          gendersData.find((gender) => gender.value === familyMember.gender) ||
          null,
      },
    });
  };

  const popupRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => setActionsOpen(false));
  return (
    <div
      key={familyMember.id}
      className={
        "flex justify-between items-center py-8 border-b border-b-[#E3E3E3] relative"
      }
    >
      {deleteUserFamilyMemberPending && (
        <div
          className={
            "absolute w-full h-full left-0 top-0 bg-opacity-40 bg-primary flex items-center justify-center"
          }
        >
          <CustomLoader />
        </div>
      )}
      <div className={"flex items-center gap-4 "}>
        <div
          className={
            "h-11 w-11 bg-[#F2F2F2] rounded-full flex items-center justify-center"
          }
        >
          <ProfileInfoIcon className={"fill-[#747474]"} />
        </div>
        <div>
          <h4 className={"font-medium leading-6"}>
            {familyMember.name + " " + familyMember.surname}
          </h4>
          <p className={"text-[#6E6E6E] text-14 font-medium mt-1"}>
            {new Intl.DateTimeFormat("az-Cyrl-AZ").format(
              new Date(familyMember.birthday),
            )}
          </p>
        </div>
      </div>
      <div className={"relative"} ref={popupRef}>
        <ProfileMoreIcon
          className={"z-0 cursor-pointer"}
          onClick={() => setActionsOpen((prevState) => !prevState)}
        />
        {isActionsOpen && (
          <Menu>
            <div
              onClick={updateUserFamilyMember}
              className={
                "flex items-center gap-3 p-4 trans hover:bg-gray-100 cursor-pointer"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M2 20.9999H8C8.26522 20.9999 8.51957 20.8946 8.70711 20.707C8.89464 20.5195 9 20.2651 9 19.9999C9 19.7347 8.89464 19.4803 8.70711 19.2928C8.51957 19.1053 8.26522 18.9999 8 18.9999H3.071C3.31366 17.3347 4.14714 15.8124 5.41925 14.7108C6.69136 13.6093 8.31724 13.002 10 12.9999C11.1775 13.0101 12.3214 12.6081 13.2336 11.8634C14.1457 11.1187 14.7686 10.0784 14.9943 8.92271C15.2199 7.76701 15.0341 6.56878 14.4691 5.53569C13.904 4.5026 12.9953 3.69975 11.9005 3.26629C10.8057 2.83283 9.59368 2.79608 8.47459 3.1624C7.3555 3.52871 6.39984 4.27502 5.77322 5.27197C5.14661 6.26892 4.88855 7.45369 5.04375 8.62094C5.19895 9.78818 5.75765 10.8643 6.623 11.6629C4.96321 12.3362 3.54177 13.489 2.54021 14.974C1.53864 16.459 1.00242 18.2088 1 19.9999C1 20.2651 1.10536 20.5195 1.29289 20.707C1.48043 20.8946 1.73478 20.9999 2 20.9999ZM10 4.99992C10.5933 4.99992 11.1734 5.17587 11.6667 5.50551C12.1601 5.83516 12.5446 6.30369 12.7716 6.85187C12.9987 7.40005 13.0581 8.00325 12.9424 8.58519C12.8266 9.16713 12.5409 9.70168 12.1213 10.1212C11.7018 10.5408 11.1672 10.8265 10.5853 10.9423C10.0033 11.058 9.40013 10.9986 8.85195 10.7716C8.30377 10.5445 7.83524 10.16 7.50559 9.66663C7.17595 9.17328 7 8.59326 7 7.99992C7 7.20427 7.31607 6.44121 7.87868 5.8786C8.44129 5.31599 9.20435 4.99992 10 4.99992ZM20.207 9.29292C20.0195 9.10545 19.7652 9.00013 19.5 9.00013C19.2348 9.00013 18.9805 9.10545 18.793 9.29292L12.543 15.5429C12.4337 15.653 12.3513 15.7868 12.302 15.9339L11.052 19.6839C11.002 19.8342 10.9883 19.9942 11.0122 20.1507C11.0361 20.3073 11.0968 20.4559 11.1894 20.5844C11.2819 20.7129 11.4037 20.8176 11.5446 20.8898C11.6856 20.9621 11.8416 20.9998 12 20.9999C12.1074 20.9998 12.214 20.9825 12.316 20.9489L16.066 19.6989C16.2134 19.6497 16.3472 19.5669 16.457 19.4569L22.707 13.2069C22.8945 13.0194 22.9998 12.7651 22.9998 12.4999C22.9998 12.2348 22.8945 11.9804 22.707 11.7929L20.207 9.29292ZM15.207 17.8759L13.578 18.4189L14.121 16.7899L19.5 11.4139L20.586 12.4999L15.207 17.8759Z"
                  fill="#747474"
                />
              </svg>
              <p className={"text-14 font-medium min-w-max  "}>
                Məlumatları dəyişdirin
              </p>
            </div>
            <div
              onClick={() => deleteUserFamilyMember(familyMember.id)}
              className={
                "flex items-center gap-3 p-4 trans hover:bg-red-100 cursor-pointer"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 5H17V2C17 1.73478 16.8946 1.48043 16.7071 1.29289C16.5196 1.10536 16.2652 1 16 1H8C7.73478 1 7.48043 1.10536 7.29289 1.29289C7.10536 1.48043 7 1.73478 7 2V5H2C1.73478 5 1.48043 5.10536 1.29289 5.29289C1.10536 5.48043 1 5.73478 1 6C1 6.26522 1.10536 6.51957 1.29289 6.70711C1.48043 6.89464 1.73478 7 2 7H3.117L5.008 22.124C5.03822 22.3658 5.1557 22.5883 5.33836 22.7496C5.52103 22.9109 5.75631 22.9999 6 23H18C18.2437 22.9999 18.479 22.9109 18.6616 22.7496C18.8443 22.5883 18.9618 22.3658 18.992 22.124L20.883 7H22C22.2652 7 22.5196 6.89464 22.7071 6.70711C22.8946 6.51957 23 6.26522 23 6C23 5.73478 22.8946 5.48043 22.7071 5.29289C22.5196 5.10536 22.2652 5 22 5ZM9 3H15V5H9V3ZM17.117 21H6.883L5.133 7H18.867L17.117 21Z"
                  fill="#E43054"
                />
              </svg>
              <p className={"text-14 font-medium min-w-max text-[#E43054] "}>
                Ailə üzvünü silin
              </p>
            </div>
          </Menu>
        )}
      </div>
    </div>
  );
};
export default FamilyMembersPage;
