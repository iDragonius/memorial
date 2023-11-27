import React, { FC, useContext, useState } from "react";
import { createDefaultMaskGenerator, MaskedInput } from "react-hook-mask";
import { AuthApi } from "@/lib/api/auth.api";
import clsx from "clsx";
import Error from "@/components/ui/Error";
import { useRouter } from "next/navigation";
import { AuthContextData } from "@/components/ui/providers/AuthContext";
import { UserContext } from "@/components/ui/providers/UserProvider";
import toast from "react-hot-toast";
import ErrorMessages from "@/lib/error-messages";
import { ShowError } from "@/utils/show-error";
const maskGenerator = createDefaultMaskGenerator("9999");

export interface OtpScreenProps {
  phoneNumber: string;
}

const OtpScreen: FC<OtpScreenProps> = ({ phoneNumber }) => {
  const { push } = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const authData = useContext(AuthContextData);
  const { refetch } = useContext(UserContext);
  const checkOtpAndLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (otp.length < 4) {
      setError("OTP kodu düzgün daxil edin!");
      return;
    }
    AuthApi.checkOtp({ phone: phoneNumber, otp })
      .then((res) => {
        if (res.data.data.register) {
          AuthApi.loginWithOtp({
            otpId: res.data.data.id,
            phone: phoneNumber,
          }).then((loginRes) => {
            if (loginRes.data.success) {
              localStorage.setItem(
                "token",
                loginRes.data.data.tokens.accessToken,
              );
              localStorage.setItem(
                "refreshToken",
                loginRes.data.data.tokens.refreshToken,
              );
              refetch();

              push("/");
              toast.success("Xoş gəlmisiniz!");
            }
          });
        } else {
          push("/auth/sign-up");
          authData?.setData(() => ({
            redirectedToRegister: true,
            phone: phoneNumber,
            otpId: res.data.data.id,
          }));
        }
      })
      .catch((error) => {
        setError(ErrorMessages[error.response.data.data.messages[0]]);
        ShowError(error);
      });
  };
  return (
    <div>
      <h1
        className={"text-24 sm:text-32 max-[1000px]:text-center font-semibold"}
      >
        Təsdiqləmə
      </h1>
      <p
        className={
          "text-[#747474] text-14 mt-3 mb-10 leading-6 max-[1000px]:text-center"
        }
      >
        +994 {phoneNumber} nömrəsinə göndərilən 4 rəqəmli kodu aşağıdakı boş
        xanaya yazaraq doldurun.
      </p>

      <form onSubmit={checkOtpAndLogin}>
        <p className={"text-14 font-medium mb-2"}>OTP kodu*</p>
        <MaskedInput
          autoFocus={true}
          value={otp}
          onChange={(data) => setOtp(data)}
          maskGenerator={maskGenerator}
          placeholder={"OTP kodu daxil edin"}
          className={
            "w-full  border border-inputBorder px-4 py-3 outline-none trans hover:ring-2 hover:ring-opacity-60 hover:ring-primary focus:ring-2 focus:ring-opacity-60 focus:ring-primary rounded-[2px] placeholder:text-[#BBBBBB] hover:text-primary focus:text-primary"
          }
        />
        <Error error={error} />

        <button
          className={clsx(
            "py-3 px-6 w-full rounded-[4px] mt-6 font-medium ",
            otp.length === 4
              ? "trans bg-primary text-white hover:ring-4 hover:ring-primary hover:ring-opacity-70"
              : "text-[#BBBBBB] bg-[#F2F2F2]",
          )}
        >
          Davam Et
        </button>
      </form>
    </div>
  );
};

export default OtpScreen;
