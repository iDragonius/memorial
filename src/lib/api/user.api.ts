import api from "@/lib/api/index";
import { Routes } from "@/lib/api/routes";
import { ResponseProps } from "@/shared/types/response.type";
import { UserProps } from "@/components/ui/providers/UserProvider";
import { GenderTypes } from "@/shared/types/gender.types";
import toast from "react-hot-toast";

export interface GetUserProfileResponse extends ResponseProps {
  data: UserProps;
}
export interface UserFamilyMemberProps {
  name: string;
  surname: string;
  fatherName: string;
  gender: GenderTypes;
  birthday: string;
  id: string;
  isDefault: boolean;
  userId: string;
}
export interface GetUserFamilyMembersResponse extends ResponseProps {
  data: UserFamilyMemberProps[];
}
export interface UserCardProps {
  brand: string;
  cardUuid: string;
  id: string;
  isActive: boolean;
  pan: string;
}
export interface GetUserCardsResponse extends ResponseProps {
  data: UserCardProps[];
}
export interface CreateUserFamilyMemberResponse extends ResponseProps {}
export interface UserFamilyMemberPropsData {
  name: string;
  surname: string;
  fatherName: string;
  gender: GenderTypes | null;
  birthday: string;
}
export interface UpdateUserProfileResponse extends ResponseProps {
  data: {};
}

export interface UpdateUserProfileDataProps {
  name: string;
  surname: string;
  fatherName: string;
  gender: GenderTypes;
  birthday: string;
}

export interface DeleteUserPhotoResponse extends ResponseProps {}
export interface AddUserPhotoResponse extends ResponseProps {}
export interface DeleteUserFamilyMemberResponse extends ResponseProps {}
export interface UpdateUserFamilyMemberResponse extends ResponseProps {
  data: UserFamilyMemberPropsData;
}
export const UserApi = {
  async getUserProfile() {
    const response = await api.get<GetUserProfileResponse>(
      `/v1${Routes.USER}/profile`,
    );

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return;
    }
    return response;
  },
  async getUserFamilyMembers() {
    return await api.get<GetUserFamilyMembersResponse>(
      `/v1${Routes.USER}/member`,
    );
  },
  async createUserFamilyMember({
    name,
    surname,
    fatherName,
    gender,
    birthday,
  }: UserFamilyMemberPropsData) {
    return await api.post<CreateUserFamilyMemberResponse>(
      `/v1${Routes.USER}/member`,
      {
        name,
        surname,
        fatherName,
        gender,
        birthday,
      },
    );
  },
  async getUserCards() {
    return await api.get<GetUserCardsResponse>(`/v1${Routes.USER}/card`);
  },
  async updateUserProfile({
    name,
    surname,
    fatherName,
    birthday,
    gender,
  }: UpdateUserProfileDataProps) {
    return await api.put<UpdateUserProfileResponse>(`/v1${Routes.USER}`, {
      name,
      surname,
      fatherName,
      birthday,
      gender,
    });
  },
  async deleteUserPhoto() {
    return await api.delete<DeleteUserPhotoResponse>(`/v1${Routes.USER}/photo`);
  },
  async addUserPhoto(photoId: string) {
    return await api.post<AddUserPhotoResponse>(`/v1${Routes.USER}/photo`, {
      photoId,
    });
  },
  async deleteUserFamilyMember(id: string) {
    return await api.delete<DeleteUserFamilyMemberResponse>(
      `/v1${Routes.USER}/member/${id}`,
    );
  },
  async updateUserFamilyMember({
    id,
    data,
  }: {
    id: string;
    data: UserFamilyMemberPropsData;
  }) {
    return await api.put<UpdateUserFamilyMemberResponse>(
      `/v1${Routes.USER}/member/${id}`,
      data,
    );
  },
};
