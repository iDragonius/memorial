import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { BranchItemProps, InformationProps } from "@/lib/api/branch-item.api";
import { useLockedBody, useOnClickOutside } from "usehooks-ts";
import clsx from "clsx";
import { CrossIcon } from "@/components/icons";
import { UserContext } from "@/components/ui/providers/UserProvider";
import { BasketContext } from "@/components/ui/providers/BasketProvider";
import { useMutation } from "@tanstack/react-query";
import { BasketApi } from "@/lib/api/basket.api";
import { useRouter } from "next/router";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import toast from "react-hot-toast";
import ErrorMessages from "@/lib/error-messages";
import { ShowError } from "@/utils/show-error";
import FamilyMemberModal from "@/components/ui/modals/FamilyMemberModal";

export interface BranchItemModalProps {
  data: BranchItemProps;
  close: () => void;
}

const BranchItemModal: FC<BranchItemModalProps> = ({ data, close }) => {
  const modalRef = useRef<null | HTMLDivElement>(null);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>(
    [],
  );

  useLockedBody(true, "root");
  useOnClickOutside(modalRef, close);
  const { query, push } = useRouter();
  const [activeTab, setActiveTab] = useState<InformationProps | null>(
    data.item.details?.information ? data.item.details?.information[0] : null,
  );
  const { userFamilyMembersData, userData } = useContext(UserContext);
  const { setBasketData } = useContext(BasketContext);
  const { mutateAsync: addItemToBasketFunc, isPending } = useMutation({
    mutationFn: BasketApi.addItemToBasket,
  });
  const addToBasket = (data: BranchItemProps) => {
    if (isPending) return;
    const selectedFamilyMembersTemp = selectedFamilyMembers;
    if (!userData) {
      push("/auth/sign-in");
      return;
    }
    if (!userFamilyMembersData.length) {
      selectedFamilyMembersTemp.push(userData?.id as string);
    }
    if (!selectedFamilyMembers.length) {
      toast.error("Xidməti əlavə eləmək üçün ailə üzvünü seçin!");
      return;
    }

    addItemToBasketFunc({
      branchId: data.branch.id,
      branchItemId: data.id,
      familyMemberIds: selectedFamilyMembersTemp,
    })
      .then((res) => {
        if (res.data.success) {
          setBasketData(res.data.data);
          close();
          toast.success("Səbətə əlavə olundu!");
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };
  const [isFamilyMemberModalOpen, setFamilyMemberModalOpen] =
    useState<boolean>(false);
  return (
    <>
      {isFamilyMemberModalOpen && (
        <FamilyMemberModal
          update={null}
          close={() => setFamilyMemberModalOpen(false)}
          newRef={modalRef}
        />
      )}
      <div
        className={
          "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-[600]"
        }
      >
        <div
          ref={modalRef}
          className={
            "bg-white rounded-[16px] px-7 py-10 w-full max-sm:h-screen max-w-[820px]"
          }
        >
          <div className={"max-sm:h-[80vh] overflow-y-auto"}>
            <div className={"flex gap-3 justify-between items-center  mb-6"}>
              <h3 className={"text-[#8B8B8B] text-20 font-semibold"}>
                {data.item.details.locales[0].name}
              </h3>
              <div
                onClick={close}
                className={
                  "w-7 h-7 trans hover:bg-gray-100 flex items-center justify-center rounded-[5px] cursor-pointer"
                }
              >
                <CrossIcon />
              </div>
            </div>

            {!!data.item.details.information?.length && (
              <InformationTabs
                data={data.item.details.information}
                active={activeTab}
                setActive={setActiveTab}
              />
            )}
            {userFamilyMembersData.length > 0 && (
              <div className={"mt-3"}>
                <p className={"font-medium mb-2"}>Kimin üçün</p>
                <div className={"flex overflow-x-auto gap-4 w-full"}>
                  <div className={"flex items-center gap-2 "}>
                    <input
                      type={"checkbox"}
                      className={"w-5 h-5 accent-primary"}
                      id={userData?.id}
                      checked={selectedFamilyMembers.includes(
                        userData?.id as string,
                      )}
                      onChange={(e) => {
                        let temp = [...selectedFamilyMembers];
                        if (e.target.checked) {
                          temp.push(userData?.id as string);
                        } else {
                          temp = temp.filter((el) => el !== userData?.id);
                        }
                        setSelectedFamilyMembers(temp);
                      }}
                    />
                    <label
                      htmlFor={userData?.id}
                      className={"text-primary min-w-max"}
                    >
                      {userData?.name + " " + userData?.surname}
                    </label>
                  </div>
                  {userFamilyMembersData.map((familyMember) => (
                    <div
                      className={"flex items-center gap-2 "}
                      key={familyMember.id}
                    >
                      <input
                        type={"checkbox"}
                        className={"w-5 h-5 accent-primary"}
                        id={familyMember.id}
                        onChange={(e) => {
                          let temp = [...selectedFamilyMembers];
                          if (e.target.checked) {
                            temp.push(familyMember.id as string);
                          } else {
                            temp = temp.filter((el) => el !== familyMember.id);
                          }
                          setSelectedFamilyMembers(temp);
                        }}
                        checked={selectedFamilyMembers.includes(
                          familyMember.id,
                        )}
                      />
                      <label
                        className={"text-primary min-w-max"}
                        htmlFor={familyMember.id}
                      >
                        {familyMember?.name + " " + familyMember?.surname}
                      </label>
                    </div>
                  ))}
                  <div
                    className={"flex items-center gap-1.5 cursor-pointer"}
                    onClick={() => setFamilyMemberModalOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM13 7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                        fill="#099B87"
                      />
                    </svg>
                    <p className={"text-primary min-w-max"}>
                      Ailə üzvü əlavə et
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={"flex justify-end gap-4 mt-3"}>
            <button
              className={
                "border border-[#DADADA] rounded-[4px] px-8 py-4 h-14 flex items-center justify-center text-primary text-18 trans hover:border-primary focus:outline-none focus:border-primary"
              }
              onClick={close}
            >
              Bağla
            </button>
            <button
              onClick={() => addToBasket(data)}
              className={
                "flex gap-4 text-white bg-primary px-6 py-4 rounded-[4px] h-14  items-center justify-center text-18 trans hover:ring-2 hover:ring-primary hover:ring-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 "
              }
            >
              <div className={"flex items-center gap-1"}>
                {isPending && <ButtonLoader />}
                <span>Əlavə et</span>
              </div>
              <span>{data.promotedPrice / 100} azn</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InformationTabs = ({
  data,
  active,
  setActive,
}: {
  data: InformationProps[];
  active: InformationProps | null;
  setActive: Dispatch<SetStateAction<InformationProps | null>>;
}) => {
  return (
    <>
      <div className={"flex border-b  border-[#DADADA] w-full overflow-x-auto"}>
        {data.map((tab) => (
          <button
            onClick={() => {
              if (tab.id === active?.id) return;

              setActive(tab);
            }}
            key={tab.id}
            className={clsx(
              "px-5 pb-2 cursor-pointer min-w-max  trans focus:outline-none focus:text-primary",
              active?.id === tab.id
                ? "border-b-4 border-b-primary text-primary"
                : "text-[#171717]",
            )}
          >
            {tab.locales[0].label}
          </button>
        ))}
      </div>
      {active && (
        <div
          className={
            "mt-6 markdown h-[calc(100vh-350px)] sm:max-h-[400px] overflow-y-auto"
          }
          dangerouslySetInnerHTML={{
            __html: active?.locales[0].ckEditorData,
          }}
        ></div>
      )}
    </>
  );
};

export default BranchItemModal;
