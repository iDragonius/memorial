import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { GenderTypes } from "@/shared/types/gender.types";

export interface SendOtpResponse extends ResponseProps {
  data: {
    expireInSeconds: number;
  };
}
export interface CheckOtpResponse extends ResponseProps {
  data: {
    id: string;
    register: boolean;
  };
}
export interface LoginWithOtpResponse extends ResponseProps {
  data: {
    tokens: {
      accessToken: string;
      accessTokenExpiresIn: string;
      refreshToken: string;
    };
    user: {
      type: string;
    };
  };
}
export interface RegisterProps {
  user: {
    email: string;
    phone: string;
  };
  familyMember: {
    name: string;
    surname: string;
    fatherName: string;
    gender: GenderTypes;
    birthday: string;
  };
  otpId: string;
}

export interface RegisterResponse extends ResponseProps {
  data: {
    tokens: {
      accessToken: string;
      accessTokenExpiresIn: string;
      refreshToken: string;
    };
    user: {
      type: string;
    };
  };
}

export interface LogoutResponse extends ResponseProps {}
export const AuthApi = {
  async sendOtp(phone: string) {
    return await api.post<SendOtpResponse>(`/v1${Routes.AUTH}/otp`, { phone });
  },

  async checkOtp({ phone, otp }: { phone: string; otp: string }) {
    return await api.post<CheckOtpResponse>(`/v1${Routes.AUTH}/check-otp`, {
      phone,
      otp,
    });
  },
  async loginWithOtp({ otpId, phone }: { otpId: string; phone: string }) {
    return await api.post<LoginWithOtpResponse>(
      `/v1${Routes.AUTH}/login-with-otp`,
      {
        phone,
        otpId,
      },
    );
  },
  async register(data: RegisterProps) {
    return await api.post<RegisterResponse>(`/v1${Routes.AUTH}/register`, data);
  },
  async logout() {
    return await api.delete<LogoutResponse>(`/v1${Routes.AUTH}/logout`);
  },
};
