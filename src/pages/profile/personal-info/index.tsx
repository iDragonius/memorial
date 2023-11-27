import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/use-auth";
import { CustomPage } from "@/shared/types/layout.types";
import Title from "@/components/screens/profile/Back";
import TextInput from "@/components/ui/inputs/TextInput";
import { UserContext } from "@/components/ui/providers/UserProvider";
import GenderSelect from "@/components/ui/gender-select";
import { SelectDataProps } from "@/components/ui/select";
import { gendersData } from "@/components/ui/gender-select/genders.data";
import { createDefaultMaskGenerator, MaskedInput } from "react-hook-mask";
import Error from "@/components/ui/Error";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/lib/api/user.api";
import { GenderTypes } from "@/shared/types/gender.types";
import { ShowError } from "@/utils/show-error";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import toast from "react-hot-toast";
import ProfileLayout from "@/components/layouts/profile";
const maskGenerator = createDefaultMaskGenerator("99 999 99 99");

export interface ProfilePersonalInfoPageProps {}
export interface UserProfileProps {
  name: string;
  surname: string;
  fatherName: string;
  email: string;
  phone: string;
  gender: SelectDataProps | null;
  birthday: string;
}
const ProfilePersonalInfoPage: CustomPage<
  ProfilePersonalInfoPageProps
> = () => {
  const { mutateAsync: updateUserProfileFunc, isPending } = useMutation({
    mutationFn: UserApi.updateUserProfile,
  });
  const { userData } = useContext(UserContext);
  const [data, setData] = useState<UserProfileProps>({
    name: "",
    surname: "",
    fatherName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: null,
  });
  useEffect(() => {
    if (userData) {
      const gender = gendersData.find((item) => item.value === userData.gender);
      setData({
        name: userData.name,
        gender: gender || null,
        surname: userData.surname,
        fatherName: userData.fatherName,
        email: userData.email,
        birthday: userData.birthday,
        phone: userData.phone,
      });
    }
  }, [userData]);
  useAuth();
  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUserProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    updateUserProfileFunc({
      ...data,
      gender: data.gender?.value as GenderTypes,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("İstifadəçi məlumatları uğurla dəyişdirildi!");
        }
      })
      .catch((err) => ShowError(err));
  };

  return (
    <>
      <ProfileLayout>
        <Head>
          <title>Şəxsi Məlumatlar</title>
        </Head>
        <main
          className={"bg-white nb:border border-[#E3E3E3] w-full py-6 nb:px-8 "}
        >
          <Title label={"Şəxsi Məlumatlar"} />

          <div
            className={"grid grid-cols-1 min-[1200px]:grid-cols-2 gap-8 mt-8"}
          >
            <div className={"flex flex-col gap-8"}>
              <TextInput
                label={"Ad*"}
                placeholder={"Ad"}
                name={"name"}
                value={data.name}
                onChange={changeData}
              />
              <TextInput
                label={"Ata adı*"}
                placeholder={"Ata adı"}
                name={"fatherName"}
                value={data.fatherName}
                onChange={changeData}
              />

              <GenderSelect
                selected={data.gender}
                onChange={(data) =>
                  setData((prevState) => ({ ...prevState, gender: data }))
                }
              />
              <TextInput
                label={"Email*"}
                placeholder={"Email"}
                name={"email"}
                value={data.email}
                onChange={changeData}
                disabled={true}
              />
            </div>
            <div className={"flex flex-col gap-8"}>
              <TextInput
                label={"Soyad*"}
                placeholder={"Soyad"}
                name={"surname"}
                value={data.surname}
                onChange={changeData}
              />
              <div>
                <label htmlFor="birthday" className={" text-14 font-medium"}>
                  Doğum tarixi*
                </label>
                <input
                  type="date"
                  name={"birthday"}
                  onChange={changeData}
                  value={data.birthday}
                  className={
                    "mt-2 h-12 block w-full outline-none placeholder:text-[#A8A8A8] placeholder:font-medium border border-inputBorder rounded-[4px] px-4 py-3 hover:border-primary focus:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:ring-2 focus:ring-primary focus:ring-opacity-70 font-medium trans"
                  }
                />
              </div>

              <div className={"h-[80px]"}>
                <p className={"text-14 font-medium "}>Nömrə*</p>
                <div className={"flex gap-2 items-center mt-2"}>
                  <div
                    className={
                      "border border-inputBorder h-12 p-3 w-max text-[#BBB] flex items-center justify-center"
                    }
                  >
                    +994
                  </div>
                  <MaskedInput
                    disabled={true}
                    autoFocus={true}
                    value={data.phone}
                    onChange={(data) =>
                      setData((prevState) => ({ ...prevState, phone: data }))
                    }
                    maskGenerator={maskGenerator}
                    placeholder={"Nömrənizi daxil edin"}
                    className={
                      "w-full h-12  border border-inputBorder px-4 py-3 outline-none trans hover:ring-2 hover:ring-opacity-60 hover:ring-primary focus:ring-2 focus:ring-opacity-60 focus:ring-primary rounded-[2px] placeholder:text-[#BBBBBB] hover:text-primary focus:text-primary"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"flex justify-end mt-10"}>
            <button
              onClick={updateUserProfile}
              className={
                "text-white bg-primary py-3 px-6 h-12 flex items-center justify-center font-medium rounded-[4px] outline-none hover:ring-4 hover:ring-opacity-70 hover:ring-primary focus:right-4 focus:ring-primary focus:ring-opacity-70 trans gap-1"
              }
            >
              {isPending && <ButtonLoader />}
              Yadda saxla
            </button>
          </div>
        </main>
      </ProfileLayout>
    </>
  );
};
ProfilePersonalInfoPage.Layout = "Main";
export default ProfilePersonalInfoPage;
