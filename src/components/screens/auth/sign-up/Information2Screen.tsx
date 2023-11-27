import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { UserProps } from "@/pages/auth/sign-up";
import PageView from "@/components/screens/auth/PageView";
import TextInput from "@/components/ui/inputs/TextInput";
import ConditionalButton from "@/components/ui/ConditionalButton";
import GenderSelect from "@/components/ui/gender-select";
import { AuthApi } from "@/lib/api/auth.api";
import { GenderTypes } from "@/shared/types/gender.types";
import { ShowError } from "@/utils/show-error";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { EmailPattern } from "@/lib/patterns";
import Error from "@/components/ui/Error";

export interface Information2ScreenProps {
  setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
  userData: UserProps;
  phoneNumber: string;
}
interface AdditionalInfoErrors {
  email: null | string;
  birthday: null | string;
  gender: null | string;
}
const Information2Screen: FC<Information2ScreenProps> = ({
  userData,
  setUserData,
  phoneNumber,
}) => {
  const { push } = useRouter();
  const { refetch } = useContext(UserContext);
  const [errors, setErrors] = useState<AdditionalInfoErrors>({
    email: null,
    gender: null,
    birthday: null,
  });
  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      email: null,
      gender: null,
      birthday: null,
    });
    const tempErrors: AdditionalInfoErrors = {
      email: null,
      gender: null,
      birthday: null,
    };
    let hasError = false;
    console.log(userData);
    if (!userData.gender) {
      toast.error("Cinsinizi daxil edin!");
      tempErrors.gender = "Cinsinizi daxil edin!";
      hasError = true;
    }
    if (!userData.birthday) {
      toast.error("Doğum tarixinizi daxil edin!");
      tempErrors.birthday = "Doğum tarixinizi daxil edin!";
      hasError = true;
    }
    if (!EmailPattern.test(userData.email)) {
      toast.error("Emailinizi düzgün daxil edin!");
      tempErrors.email = "Emailinizi düzgün daxil edin!";
      hasError = true;
    }
    if (hasError) {
      setErrors(tempErrors);
      return;
    }
    AuthApi.register({
      user: {
        email: userData.email,
        phone: phoneNumber,
      },
      familyMember: {
        name: userData.name,
        surname: userData.surname,
        fatherName: userData.fatherName,
        gender: userData.gender?.value as GenderTypes,
        birthday: userData.birthday,
      },
      otpId: userData.otpId,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Təbriklər, Qeydiyyat uğurla başa çatdı.", {
            duration: 4000,
          });
          localStorage.setItem("token", res.data.data.tokens.accessToken);
          localStorage.setItem(
            "refreshToken",
            res.data.data.tokens.refreshToken,
          );
          refetch();

          setTimeout(() => {
            push("/");
          }, 2000);
        }
      })
      .catch((err) => ShowError(err));
  };
  return (
    <div>
      <PageView currentPage={4} pageCount={4} />
      <h1
        className={
          "text-24 sm:text-32 font-semibold mb-3 max-[1000px]:text-center"
        }
      >
        Sizi daha yaxından tanımağa kömək edin
      </h1>
      <p
        className={
          "text-[#747474] text-14 leading-6 mb-10 max-[1000px]:text-center"
        }
      >
        Artıq klinikamızda verdiyiniz analizlərin cavabı burada qeyd etdiyiniz
        E-mail ünvanına göndəriləcəkdir.
      </p>

      <form className={"flex flex-col gap-6"} onSubmit={register}>
        <div>
          <GenderSelect
            selected={userData.gender}
            onChange={(data) =>
              setUserData((prevState) => ({
                ...prevState,
                gender: data,
              }))
            }
          />

          <Error error={errors.gender} />
        </div>

        <div>
          <label htmlFor="birthday" className={" text-14 font-medium"}>
            Doğum tarixi*
          </label>
          <input
            type="date"
            name={"birthday"}
            onChange={changeData}
            value={userData.birthday}
            className={
              "mt-2 block w-full outline-none placeholder:text-[#A8A8A8] placeholder:font-medium border border-inputBorder rounded-[4px] px-4 py-3 hover:border-primary focus:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:ring-2 focus:ring-primary focus:ring-opacity-70 font-medium trans"
            }
          />
          <Error error={errors.birthday} />
        </div>
        <div>
          <TextInput
            label={"E-mail*"}
            name={"email"}
            placeholder={"E-mailinizi daxil edin"}
            value={userData.email}
            onChange={changeData}
          />
          <Error error={errors.email} />
        </div>

        <ConditionalButton disabled={false} label={"Tamamla"} />
      </form>
    </div>
  );
};

export default Information2Screen;
