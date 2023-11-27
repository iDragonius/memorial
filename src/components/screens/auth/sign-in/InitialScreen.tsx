import React, { FC } from "react";
import { createDefaultMaskGenerator, MaskedInput } from "react-hook-mask";
import { SignInSteps } from "@/pages/auth/sign-in";
import { clsx } from "clsx";
import Delimiter from "@/components/screens/auth/Delimiter";
import Link from "next/link";
import { AuthApi } from "@/lib/api/auth.api";
import { ShowError } from "@/utils/show-error";
const maskGenerator = createDefaultMaskGenerator("99 999 99 99");

export interface InitialScreenProps {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  changeStep: (step: SignInSteps) => void;
}

const InitialScreen: FC<InitialScreenProps> = ({
  phoneNumber,
  setPhoneNumber,
  changeStep,
}) => {
  const sendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber.length < 9) return;
    AuthApi.sendOtp(phoneNumber)
      .then((res) => {
        if (res.data.success) {
          changeStep("OTP");
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };
  return (
    <div>
      <h1
        className={
          "text-24 sm:text-32 font-semibold mb-3 max-[1000px]:text-center"
        }
      >
        Hesabınıza daxil olun
      </h1>
      <p
        className={
          "text-[#747474] text-14 leading-6 mb-10 max-[1000px]:text-center"
        }
      >
        Şəxsi kabinetə daxil olaraq xidmətləri səbətə əlavə edə, sifarişlərin
        tarixçəsinə baxa bilərsiniz və eyni zamanda da müəyyən edilmiş
        endirimlərdən yararlana bilərsiniz.
      </p>
      <form onSubmit={sendOtp}>
        <p className={"text-14 font-medium mb-2"}>Nömrə*</p>
        <div className={"flex gap-2 items-center mb-6"}>
          <div className={"border border-inputBorder p-3 w-max text-[#BBB]"}>
            +994
          </div>
          <MaskedInput
            autoFocus={true}
            value={phoneNumber}
            onChange={(data) => setPhoneNumber(data)}
            maskGenerator={maskGenerator}
            placeholder={"Nömrənizi daxil edin"}
            className={
              "w-full  border border-inputBorder px-4 py-3 outline-none trans hover:ring-2 hover:ring-opacity-60 hover:ring-primary focus:ring-2 focus:ring-opacity-60 focus:ring-primary rounded-[2px] placeholder:text-[#BBBBBB] hover:text-primary focus:text-primary"
            }
          />
        </div>
        <button
          className={clsx(
            "py-3 px-6 w-full rounded-[4px] font-medium",
            phoneNumber.length === 9
              ? "trans bg-primary text-white hover:ring-4 hover:ring-primary hover:ring-opacity-70"
              : "text-[#BBBBBB] bg-[#F2F2F2]",
          )}
        >
          Davam Et
        </button>
      </form>

      <Delimiter />

      <p className={"text-[#6E6E6E] text-14 text-center font-medium"}>
        Hələ də hesabınız yoxdur?{" "}
        <Link href={`/auth/sign-up`} className={"text-[#1758C9]   font-bold"}>
          Qeydiyyatdan keçin
        </Link>
      </p>
    </div>
  );
};

export default InitialScreen;
