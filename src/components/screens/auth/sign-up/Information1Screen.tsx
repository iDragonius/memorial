import React, { ChangeEvent, FC, FormEvent } from "react";
import PageView from "@/components/screens/auth/PageView";
import TextInput from "@/components/ui/inputs/TextInput";
import ConditionalButton from "@/components/ui/ConditionalButton";
import { SignUpSteps, UserProps } from "@/pages/auth/sign-up";
import toast from "react-hot-toast";

export interface Information1ScreenProps {
  setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
  userData: UserProps;
  changeStep: (step: SignUpSteps) => void;
}
const Information1Screen: FC<Information1ScreenProps> = ({
  setUserData,
  userData,
  changeStep,
}) => {
  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const changePage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        userData.name.length > 2 &&
        userData.surname.length > 2 &&
        userData.fatherName.length > 2
      )
    )
      return;
    changeStep("INFORMATION_2");
  };
  return (
    <div>
      <PageView currentPage={3} pageCount={4} />
      <h1
        className={
          " text-24 sm:text-32 font-semibold mb-3 max-[1000px]:text-center"
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
      <form className={"flex flex-col gap-6"} onSubmit={changePage}>
        <TextInput
          autoFocus={true}
          label={"Ad*"}
          name={"name"}
          placeholder={"Adınızı daxil edin"}
          value={userData.name}
          onChange={changeData}
        />
        <TextInput
          label={"Soyad*"}
          name={"surname"}
          placeholder={"Soyadınızı daxil edin"}
          value={userData.surname}
          onChange={changeData}
        />
        <TextInput
          label={"Ata adı*"}
          name={"fatherName"}
          placeholder={"Ata adınızı daxil edin"}
          value={userData.fatherName}
          onChange={changeData}
        />
        <ConditionalButton
          disabled={
            !(
              userData.name.length > 2 &&
              userData.surname.length > 2 &&
              userData.fatherName.length > 2
            )
          }
          label={"Davam Et"}
        />
      </form>
    </div>
  );
};

export default Information1Screen;
