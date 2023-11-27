import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { UserApi, UserFamilyMemberPropsData } from "@/lib/api/user.api";
import { useOnClickOutside } from "usehooks-ts";
import TextInput from "@/components/ui/inputs/TextInput";
import GenderSelect from "@/components/ui/gender-select";
import { SelectDataProps } from "@/components/ui/select";
import Error from "@/components/ui/Error";
import { GenderTypes } from "@/shared/types/gender.types";
import { ShowError } from "@/utils/show-error";
import { UserContext } from "@/components/ui/providers/UserProvider";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import toast from "react-hot-toast";
import clsx from "clsx";

export interface FamilyMemberModalProps {
  close: () => void;
  update: {
    data: FamilyMemberProps;
    id: string;
  } | null;
  setUpdate?: React.Dispatch<
    React.SetStateAction<{ data: FamilyMemberProps; id: string } | null>
  >;
  newRef?: React.MutableRefObject<HTMLDivElement | null>;
}
export type FamilyMemberFormSteps = "MAIN" | "ADDITIONAL";

export interface FamilyMemberProps
  extends Omit<UserFamilyMemberPropsData, "gender"> {
  gender: SelectDataProps | null;
}
export interface FamilyMemberErrors {
  name: string | null;
  surname: string | null;
  fatherName: string | null;
  birthday: string | null;
  gender: string | null;
}
const FamilyMemberModal: FC<FamilyMemberModalProps> = ({
  close,
  update,
  newRef,
  setUpdate,
}) => {
  const { refetchFamilyMembers } = useContext(UserContext);
  const [data, setData] = useState<FamilyMemberProps>({
    name: "",
    surname: "",
    fatherName: "",
    birthday: "",
    gender: null,
  });
  const [errors, setErrors] = useState<FamilyMemberErrors>({
    name: null,
    surname: null,
    fatherName: null,
    birthday: null,
    gender: null,
  });
  const { mutateAsync: createUserFamilyMemberFunc, isPending } = useMutation({
    mutationFn: UserApi.createUserFamilyMember,
  });
  const {
    mutateAsync: updateUserFamilyMemberFunc,
    isPending: updateUserFamilyMemberPending,
  } = useMutation({
    mutationFn: UserApi.updateUserFamilyMember,
  });
  const [currentStep, setCurrentStep] = useState<FamilyMemberFormSteps>("MAIN");
  const modalRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setCurrentStep("MAIN");
    setData({
      name: "",
      surname: "",
      fatherName: "",
      birthday: "",
      gender: null,
    });
    close();
    if (setUpdate) {
      setUpdate(null);
    }
  });
  const nextPage = () => {
    setErrors({
      name: null,
      surname: null,
      fatherName: null,
      birthday: null,
      gender: null,
    });
    const tempErrors: FamilyMemberErrors = {
      name: null,
      surname: null,
      fatherName: null,
      birthday: null,
      gender: null,
    };
    let hasErrors = false;
    if (data.name.trim().length === 0) {
      tempErrors.name = "Adı düzgün daxil edin";
      hasErrors = true;
    }
    if (data.surname.trim().length === 0) {
      tempErrors.surname = "Soyadı düzgün daxil edin";
      hasErrors = true;
    }
    if (data.fatherName.trim().length === 0) {
      tempErrors.fatherName = "Ata adını düzgün daxil edin";
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(tempErrors);
      return;
    }
    setCurrentStep("ADDITIONAL");
  };
  const previousPage = () => {
    setCurrentStep("MAIN");
  };
  const saveFamilyMember = () => {
    setErrors({
      name: null,
      surname: null,
      fatherName: null,
      birthday: null,
      gender: null,
    });
    const tempErrors: FamilyMemberErrors = {
      name: null,
      surname: null,
      fatherName: null,
      birthday: null,
      gender: null,
    };
    let hasErrors = false;
    if (!data.gender) {
      tempErrors.gender = "Cinsi daxil edin";
      hasErrors = true;
    }
    if (!data.birthday) {
      tempErrors.birthday = "Doğum tarixini daxil edin";
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(tempErrors);
      return;
    }
    if (!update) {
      createUserFamilyMemberFunc({
        ...data,
        gender: data.gender!.value as GenderTypes,
      })
        .then((res) => {
          if (res.data.success) {
            refetchFamilyMembers();
            toast.success("Ailə üzvü uğurla yaradıldı!");
            close();
          }
        })
        .catch((err) => ShowError(err));
    } else {
      updateUserFamilyMemberFunc({
        id: update.id,
        data: {
          ...data,
          gender: data.gender!.value as GenderTypes,
        },
      })
        .then((res) => {
          if (res.data.success) {
            refetchFamilyMembers();
            toast.success("Ailə üzvü məlumatları uğurla dəyişdirildi!");
            close();
          }
        })
        .catch((err) => ShowError(err));
    }
  };
  useEffect(() => {
    if (update) {
      setData((prevState) => ({
        ...prevState,
        name: update.data.name,
        surname: update.data.surname,
        fatherName: update.data.fatherName,
        gender: update.data.gender,
        birthday: update.data.birthday,
      }));
    }
  }, [update]);
  const changeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      className={
        "w-full h-full fixed top-0 left-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000]"
      }
    >
      <div
        ref={newRef || modalRef}
        className={
          "bg-white p-8 rounded-[2px] border border-[#E3E3E3] w-[500px] mx-3"
        }
      >
        <div
          className={clsx(
            "flex justify-between items-center ",
            update && "mb-10",
          )}
        >
          <h2 className={"text-24 font-semibold leading-[44px]"}>
            {update ? "Ailə üzvünü dəyiş" : "Ailə üzvünü əlavə et"}
          </h2>
          <p className={"text-[#4282F0] font-semibold"}>
            {currentStep === "MAIN" ? "1/2" : "2/2"}
          </p>
        </div>
        {!update && (
          <p className={"mt-4 leading-6 text-14 text-[#747474] mb-10"}>
            Ailə üzvlərinizi hesabınıza əlavə edərək, onlar üçün xidmət və ya
            xidmətlər sifariş edə bilərsiniz.
          </p>
        )}

        {currentStep === "MAIN" && (
          <FamilyMemberModalMainInfo
            close={close}
            nextPage={nextPage}
            data={data}
            changeData={changeData}
            errors={errors}
          />
        )}
        {currentStep === "ADDITIONAL" && (
          <FamilyMemberModalAdditionalInfo
            previousPage={previousPage}
            save={saveFamilyMember}
            data={data}
            setData={setData}
            changeData={changeData}
            errors={errors}
            isPending={isPending || updateUserFamilyMemberPending}
          />
        )}
      </div>
    </div>
  );
};

const FamilyMemberModalMainInfo = ({
  close,
  nextPage,
  data,
  changeData,
  errors,
}: {
  close: () => void;
  nextPage: () => void;
  data: FamilyMemberProps;
  changeData: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FamilyMemberErrors;
}) => {
  return (
    <div>
      <div className={"flex flex-col gap-5 mb-10"}>
        <div>
          <TextInput
            label={"Ad*"}
            placeholder={"Ad"}
            name={"name"}
            value={data.name}
            onChange={changeData}
          />
          <Error error={errors.name} />
        </div>
        <div>
          <TextInput
            label={"Soyad*"}
            placeholder={"Soyad"}
            name={"surname"}
            value={data.surname}
            onChange={changeData}
          />
          <Error error={errors.surname} />
        </div>
        <div>
          <TextInput
            label={"Ata adı*"}
            placeholder={"Ata adı"}
            name={"fatherName"}
            value={data.fatherName}
            onChange={changeData}
          />
          <Error error={errors.fatherName} />
        </div>
      </div>
      <div className={"flex justify-end gap-4 mt-3"}>
        <button
          className={
            "border border-[#DADADA] rounded-[4px] px-8 py-4 h-12 flex items-center justify-center text-primary trans hover:border-primary focus:outline-none focus:border-primary"
          }
          onClick={close}
        >
          Bağla
        </button>
        <button
          onClick={nextPage}
          className={
            "flex gap-4 text-white bg-primary px-6 py-4 rounded-[4px] h-12  items-center justify-center trans hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 "
          }
        >
          Növbəti
        </button>
      </div>
    </div>
  );
};

const FamilyMemberModalAdditionalInfo = ({
  previousPage,
  save,
  data,
  setData,
  changeData,
  errors,
  isPending,
}: {
  previousPage: () => void;
  save: () => void;
  data: FamilyMemberProps;
  setData: Dispatch<SetStateAction<FamilyMemberProps>>;
  changeData: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FamilyMemberErrors;
  isPending: boolean;
}) => {
  return (
    <div>
      <div className={"flex flex-col gap-5 mb-10"}>
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
          <Error error={errors.birthday} />
        </div>
        <div>
          <GenderSelect
            selected={data.gender}
            onChange={(data) =>
              setData((prevState) => ({ ...prevState, gender: data }))
            }
          />
          <Error error={errors.gender} />
        </div>
      </div>
      <div className={"flex justify-end gap-4 mt-3"}>
        <button
          className={
            "border border-[#DADADA] rounded-[4px] px-8 py-4 h-12 flex items-center justify-center text-primary trans hover:border-primary focus:outline-none focus:border-primary"
          }
          onClick={previousPage}
        >
          Geri
        </button>
        <button
          onClick={save}
          className={
            "flex gap-1 text-white bg-primary px-6 py-4 rounded-[4px] h-12  items-center justify-center trans hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 "
          }
        >
          {isPending && <ButtonLoader />}
          Yadda saxla
        </button>
      </div>
    </div>
  );
};
export default FamilyMemberModal;
