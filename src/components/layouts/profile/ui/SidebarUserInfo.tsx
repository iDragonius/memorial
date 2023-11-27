import React, { FC, useContext, useRef, useState } from "react";
import { UserContext } from "@/components/ui/providers/UserProvider";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import CustomLoader from "@/components/ui/loader/CustomLoader";
import { ProfileEditImageIcon } from "@/components/icons/profile";
import Menu from "@/components/ui/menu";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/lib/api/user.api";
import { ShowError } from "@/utils/show-error";
import toast from "react-hot-toast";
import { FileServiceApi } from "@/lib/api/file-service.api";
import { useOnClickOutside } from "usehooks-ts";

export interface SidebarUserInfoProps {}

const SidebarUserInfo: FC<SidebarUserInfoProps> = () => {
  const { userData, refetch } = useContext(UserContext);
  const [isProfileImagePopupOpen, setProfileImagePopupOpen] =
    useState<boolean>(false);
  const popupRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => setProfileImagePopupOpen(false));
  const {
    mutateAsync: deleteUserPhotoFunc,
    isPending: deleteUserPhotoPending,
  } = useMutation({
    mutationFn: UserApi.deleteUserPhoto,
  });

  const { mutateAsync: uploadFileFunc, isPending: uploadFilePending } =
    useMutation({
      mutationFn: FileServiceApi.uploadFile,
    });
  const uploadUserPhoto = (file: File) => {
    setProfileImagePopupOpen(false);
    if (file.type.split("/")[0] !== "image") return;

    uploadFileFunc(file)
      .then((res) => {
        if (res.data.success) {
          UserApi.addUserPhoto(res.data.data.id)
            .then((res) => {
              if (res.data.success) {
                refetch();
                toast.success("Şəkil uğurla əlavə olundu!");
              }
            })
            .catch((err) => {
              ShowError(err);
            });
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };
  const deleteUserPhoto = () => {
    setProfileImagePopupOpen(false);
    deleteUserPhotoFunc()
      .then((res) => {
        if (res.data.success) {
          refetch();
          toast.success("Şəkil uğurla silindi!");
        }
      })
      .catch((err) => ShowError(err));
  };
  return (
    <div
      className={
        "bg-white mb-4 rounded-[2px] border border-[#EFEFEF] min-h-[120px] flex items-center p-6"
      }
    >
      {userData ? (
        <>
          <div className={"flex gap-4"}>
            <div className={"relative h-max"}>
              {userData?.photo ? (
                <Image
                  src={Constants.fileApi + userData.photo.id}
                  alt={userData.name}
                  width={64}
                  height={64}
                  className={"rounded-full"}
                />
              ) : (
                <div
                  className={
                    "w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-28 text-gray-500 font-medium cursor-pointer"
                  }
                >
                  {userData.name[0].toUpperCase() +
                    userData.surname[0].toUpperCase()}
                </div>
              )}
              {(deleteUserPhotoPending || uploadFilePending) && (
                <div
                  className={
                    "absolute top-0 left-0 w-full h-full bg-primary bg-opacity-40 rounded-full"
                  }
                >
                  <CustomLoader />
                </div>
              )}
              <div className={"absolute -bottom-2 -right-2"}>
                <div className={"relative"} ref={popupRef}>
                  <ProfileEditImageIcon
                    className={" cursor-pointer"}
                    onClick={() =>
                      setProfileImagePopupOpen((prevState) => !prevState)
                    }
                  />
                  {isProfileImagePopupOpen && (
                    <Menu direction={"left"}>
                      <label
                        htmlFor={"upload"}
                        className={
                          "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
                        }
                      >
                        <input
                          className={"hidden"}
                          id={"upload"}
                          type={"file"}
                          onChange={(e) => {
                            const file = e.target.files![0];
                            if (!file) {
                              return;
                            }
                            uploadUserPhoto(file);
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 1C9.82441 1 7.69767 1.64514 5.88873 2.85383C4.07979 4.06253 2.66989 5.78049 1.83733 7.79048C1.00477 9.80047 0.786929 12.0122 1.21137 14.146C1.6358 16.2798 2.68345 18.2398 4.22183 19.7782C5.76021 21.3166 7.72022 22.3642 9.85401 22.7886C11.9878 23.2131 14.1995 22.9952 16.2095 22.1627C18.2195 21.3301 19.9375 19.9202 21.1462 18.1113C22.3549 16.3023 23 14.1756 23 12C22.9966 9.08367 21.8365 6.28778 19.7744 4.22563C17.7122 2.16347 14.9163 1.00344 12 1ZM12 21C10.22 21 8.47992 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17293C11.99 2.82567 13.7996 3.0039 15.4442 3.68508C17.0887 4.36627 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C20.9974 14.3861 20.0483 16.6738 18.361 18.361C16.6738 20.0483 14.3861 20.9974 12 21ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H13V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V13H8C7.73479 13 7.48043 12.8946 7.2929 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.2929 11.2929C7.48043 11.1054 7.73479 11 8 11H11V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12Z"
                            fill="#747474"
                          />
                        </svg>
                        <p className={"text-14 font-medium min-w-max"}>
                          Şəkil əlavə et
                        </p>
                      </label>
                      {userData.photo && (
                        <div
                          className={
                            "flex items-center gap-3 p-4 trans hover:bg-red-100 cursor-pointer"
                          }
                          onClick={deleteUserPhoto}
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
                          <p
                            className={
                              "text-14 font-medium min-w-max text-[#E43054] "
                            }
                          >
                            Şəkli sil
                          </p>
                        </div>
                      )}
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className={"text-24 font-semibold"}>
                {userData.name + " " + userData.surname}
              </h3>
              <p className={"text-[#747474] mt-1"}>
                Qeydiyyat tarixi:{" "}
                {new Intl.DateTimeFormat("az-Cyrl-AZ").format(
                  new Date(userData.createdAt),
                )}
              </p>
            </div>
          </div>
        </>
      ) : (
        <CustomLoader />
      )}
    </div>
  );
};

export default SidebarUserInfo;
