import React, { useState } from "react";
import Head from "next/head";
import { CustomPage } from "@/shared/types/layout.types";
import InitialScreen from "@/components/screens/auth/sign-in/InitialScreen";
import OtpScreen from "@/components/screens/auth/sign-in/OtpScreen";
import Link from "next/link";

export interface SignInPageProps {}
export type SignInSteps = "INITIAL" | "OTP";
const SignInPage: CustomPage<SignInPageProps> = () => {
  const [currentStep, setCurrentStep] = useState<SignInSteps>("INITIAL");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <>
      <Head>
        <title>Giriş</title>
      </Head>
      <main>
        {currentStep === "INITIAL" && (
          <InitialScreen
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            changeStep={setCurrentStep}
          />
        )}
        {currentStep === "OTP" && <OtpScreen phoneNumber={phoneNumber} />}
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

SignInPage.Layout = "Auth";
export default SignInPage;
