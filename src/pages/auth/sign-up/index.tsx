import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { CustomPage } from "@/shared/types/layout.types";
import { AuthContextData } from "@/components/ui/providers/AuthContext";
import { useRouter } from "next/navigation";
import InitialScreen from "@/components/screens/auth/sign-up/InitialScreen";
import OtpScreen from "@/components/screens/auth/sign-up/OtpScreen";
import Information1Screen from "@/components/screens/auth/sign-up/Information1Screen";
import Information2Screen from "@/components/screens/auth/sign-up/Information2Screen";
import { GenderTypes } from "@/shared/types/gender.types";
import { SelectDataProps } from "@/components/ui/select";

export type SignUpSteps = "INITIAL" | "OTP" | "INFORMATION_1" | "INFORMATION_2";
export interface SignUpPageProps {}
export interface UserProps {
  otpId: string;
  name: string;
  surname: string;
  fatherName: string;
  birthday: string;
  gender: SelectDataProps | null;
  email: string;
}
const SignUpPage: CustomPage<SignUpPageProps> = () => {
  const [currentStep, setCurrentStep] = useState<SignUpSteps>("INITIAL");
  const authData = useContext(AuthContextData);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [userData, setUserData] = useState<UserProps>({
    otpId: "",
    name: "",
    surname: "",
    fatherName: "",
    birthday: "",
    gender: null,
    email: "",
  });
  useEffect(() => {
    if (authData?.data.redirectedToRegister) {
      setCurrentStep("INFORMATION_1");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Qeydiyyat</title>
      </Head>
      <main>
        {currentStep === "INITIAL" && (
          <InitialScreen
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            changeStep={setCurrentStep}
          />
        )}
        {currentStep === "OTP" && (
          <OtpScreen
            phoneNumber={phoneNumber}
            changeStep={setCurrentStep}
            setUserData={setUserData}
          />
        )}
        {currentStep === "INFORMATION_1" && (
          <Information1Screen
            setUserData={setUserData}
            userData={userData}
            changeStep={setCurrentStep}
          />
        )}
        {currentStep === "INFORMATION_2" && (
          <Information2Screen
            setUserData={setUserData}
            userData={userData}
            phoneNumber={phoneNumber}
          />
        )}
        <div
          className={
            "min-[1000px]:absolute min-[1000px]:bottom-14 max-[1000px]:flex max-[1000px]:justify-center"
          }
        >
          <p
            className={" max-w-[372px] text-center max-[1000px]:mt-10 text-14"}
          >
            Davam edin düyməsini seçərkən sistemin{" "}
            <span className={"cursor-pointer text-[#1758C9] font-medium"}>
              “Qaydalar”
            </span>{" "}
            ını və{" "}
            <span className={"cursor-pointer text-[#1758C9] font-medium"}>
              “Məxfilik”
            </span>{" "}
            şərtlərini qəbul edirəm.
          </p>
        </div>
      </main>
    </>
  );
};
SignUpPage.Layout = "Auth";
export default SignUpPage;
