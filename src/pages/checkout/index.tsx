import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Head from "next/head";
import { UserContext } from "@/components/ui/providers/UserProvider";
import Basket from "@/components/ui/basket";
import { CardIcon, CashIcon } from "@/components/icons/payment";
import clsx from "clsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserApi } from "@/lib/api/user.api";
import { OrderApi } from "@/lib/api/order.api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { BasketContext } from "@/components/ui/providers/BasketProvider";
import { ShowError } from "@/utils/show-error";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { useAuth } from "@/hooks/use-auth";

export interface CheckoutPageProps {}
export type PaymentTypes = "CASH" | "CARD";
const CheckoutPage: FC<CheckoutPageProps> = () => {
  useAuth();
  const { userData, isUserFetched } = useContext(UserContext);
  const { setBasketData } = useContext(BasketContext);
  const { mutateAsync: createOrderFunc, isPending } = useMutation({
    mutationFn: OrderApi.createOrder,
  });
  const { push } = useRouter();

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<PaymentTypes>("CARD");

  const createOrder = () => {
    createOrderFunc({ paymentType, cardUuid: selectedCard })
      .then((res) => {
        if (res.data.success) {
          if (paymentType === "CARD") {
            if (selectedCard) {
              push("/profile/orders");
              toast.success("Sifarişiniz uğurla yaradıldı!");
            } else {
              toast.success("Ödəniş səhifəsinə yönəldirmə...");
              window.location.assign(res.data.data.redirectUrl);
            }
          } else {
            push("/profile/orders");
            toast.success("Sifarişiniz uğurla yaradıldı!");
          }
          setBasketData(null);
        }
      })
      .catch((err) => {
        ShowError(err);
      });
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <main className={"box mt-8 "}>
        <div className={"flex gap-8 "}>
          <div className={"w-full"}>
            {isUserFetched && (
              <InformationSection
                fullName={
                  (userData?.name || "") + " " + (userData?.surname || "")
                }
                phone={userData?.phone as string}
                email={userData?.email as string}
              />
            )}

            <PaymentSection
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
            />
            <button
              onClick={createOrder}
              className={
                "bg-primary text-white px-6 py-4 justify-center w-[200px] rounded-[8px] text-18 mt-5 font-medium trans hover:ring-4 hover:ring-primary hover:ring-opacity-70 outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-70 mb-5 flex items-center gap-1"
              }
            >
              {isPending && <ButtonLoader />}
              Tamamla
            </button>
          </div>
          <div className={"max-[900px]:hidden"}>
            <Basket isCheckout={true} />
          </div>
        </div>
      </main>
    </>
  );
};

const InformationSection = ({
  fullName,
  phone,
  email,
}: {
  fullName: string;
  phone: string;
  email: string;
}) => {
  const infoData = [
    {
      id: 1,
      label: fullName,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M9 8.25C9.74168 8.25 10.4667 8.03007 11.0834 7.61801C11.7001 7.20596 12.1807 6.62029 12.4645 5.93506C12.7484 5.24984 12.8226 4.49584 12.6779 3.76841C12.5333 3.04098 12.1761 2.3728 11.6517 1.84835C11.1272 1.3239 10.459 0.966751 9.73159 0.822057C9.00416 0.677362 8.25016 0.751625 7.56494 1.03545C6.87971 1.31928 6.29404 1.79993 5.88199 2.41661C5.46993 3.0333 5.25 3.75832 5.25 4.5C5.25119 5.4942 5.64666 6.44733 6.34966 7.15034C7.05267 7.85334 8.0058 8.24881 9 8.25ZM9 2.25C9.44501 2.25 9.88002 2.38196 10.25 2.62919C10.62 2.87643 10.9084 3.22783 11.0787 3.63896C11.249 4.0501 11.2936 4.5025 11.2068 4.93895C11.12 5.37541 10.9057 5.77632 10.591 6.09099C10.2763 6.40566 9.87541 6.61995 9.43895 6.70677C9.0025 6.79359 8.5501 6.74903 8.13896 6.57873C7.72783 6.40843 7.37643 6.12005 7.12919 5.75003C6.88196 5.38002 6.75 4.94501 6.75 4.5C6.75 3.90326 6.98705 3.33097 7.40901 2.90901C7.83097 2.48705 8.40326 2.25 9 2.25ZM2.25 16.5C2.25 14.7098 2.96116 12.9929 4.22703 11.727C5.4929 10.4612 7.20979 9.75 9 9.75C10.7902 9.75 12.5071 10.4612 13.773 11.727C15.0388 12.9929 15.75 14.7098 15.75 16.5C15.75 16.6989 15.671 16.8897 15.5303 17.0303C15.3897 17.171 15.1989 17.25 15 17.25C14.8011 17.25 14.6103 17.171 14.4697 17.0303C14.329 16.8897 14.25 16.6989 14.25 16.5C14.25 15.1076 13.6969 13.7723 12.7123 12.7877C11.7277 11.8031 10.3924 11.25 9 11.25C7.60761 11.25 6.27226 11.8031 5.28769 12.7877C4.30312 13.7723 3.75 15.1076 3.75 16.5C3.75 16.6989 3.67098 16.8897 3.53033 17.0303C3.38968 17.171 3.19891 17.25 3 17.25C2.80109 17.25 2.61032 17.171 2.46967 17.0303C2.32902 16.8897 2.25 16.6989 2.25 16.5Z"
            fill="#747474"
          />
        </svg>
      ),
    },
    {
      id: 2,
      label: phone,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g>
            <path
              d="M0.957732 6.64351C1.95448 10.6035 7.39723 16.05 11.3565 17.0423C11.891 17.1777 12.4401 17.2468 12.9915 17.2478C14.0393 17.2473 15.0709 16.9897 15.996 16.4978C16.3201 16.3285 16.5999 16.0853 16.8127 15.788C17.0256 15.4906 17.1656 15.1474 17.2213 14.786C17.2771 14.4246 17.2471 14.0552 17.1338 13.7075C17.0205 13.3598 16.827 13.0436 16.569 12.7845L15.0045 11.22C14.6729 10.8885 14.249 10.6646 13.7883 10.5775C13.3275 10.4904 12.8512 10.5442 12.4215 10.7318C12.0115 10.9088 11.6375 11.1597 11.3182 11.472C11.1847 11.6048 10.9387 11.6258 10.5855 11.5298C9.65939 11.1534 8.81807 10.5953 8.11114 9.88855C7.40422 9.18175 6.84602 8.34053 6.46948 7.41451C6.37498 7.06126 6.39448 6.81451 6.52798 6.68176C6.8406 6.36203 7.09178 5.98756 7.26898 5.57701C7.45614 5.14742 7.50966 4.67145 7.42258 4.21103C7.3355 3.75061 7.11185 3.32707 6.78073 2.99551L5.21623 1.43176C4.96006 1.17245 4.64591 0.977775 4.29968 0.863801C3.95345 0.749827 3.58509 0.71982 3.22498 0.776256C2.86079 0.829739 2.51451 0.968929 2.21461 1.18237C1.91472 1.39582 1.66979 1.67742 1.49998 2.00401C0.744508 3.428 0.550998 5.08368 0.957732 6.64351ZM2.82973 2.70001C2.89095 2.58282 2.97909 2.48181 3.08691 2.40528C3.19473 2.32875 3.31915 2.27888 3.44998 2.25976C3.4914 2.25316 3.53329 2.2499 3.57523 2.25001C3.68321 2.24997 3.79012 2.27136 3.88976 2.31295C3.98941 2.35453 4.07981 2.41548 4.15573 2.49226L5.71948 4.05601C5.83708 4.17223 5.91705 4.3211 5.94901 4.48332C5.98097 4.64553 5.96345 4.81361 5.89873 4.96576C5.79631 5.20992 5.65016 5.43334 5.46748 5.62501C5.19922 5.91081 5.01576 6.26561 4.93761 6.64972C4.85946 7.03383 4.88971 7.43211 5.02498 7.80001C5.56648 9.82501 8.17873 12.4343 10.2 12.975C10.5693 13.11 10.969 13.1394 11.3541 13.0599C11.7392 12.9805 12.0945 12.7952 12.3802 12.525C12.5708 12.3425 12.7929 12.1961 13.0357 12.093C13.188 12.0281 13.3562 12.0105 13.5186 12.0425C13.6809 12.0744 13.83 12.1545 13.9462 12.2723L15.51 13.836C15.6019 13.927 15.6709 14.0384 15.7113 14.1613C15.7517 14.2841 15.7624 14.4147 15.7425 14.5425C15.723 14.6735 15.6726 14.798 15.5956 14.9057C15.5185 15.0134 15.4169 15.1013 15.2992 15.162C14.2041 15.7505 12.9259 15.8997 11.7247 15.579C8.31673 14.7308 3.26998 9.68401 2.41198 6.27751C2.09175 5.07523 2.24111 3.79615 2.82973 2.70001Z"
              fill="#747474"
            />
          </g>
          <defs>
            <clipPath id="clip0_576_5765">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 3,
      label: email,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M16.5 2.25H1.5C1.30109 2.25 1.11032 2.32902 0.96967 2.46967C0.829018 2.61032 0.75 2.80109 0.75 3V15C0.75 15.1989 0.829018 15.3897 0.96967 15.5303C1.11032 15.671 1.30109 15.75 1.5 15.75H16.5C16.6989 15.75 16.8897 15.671 17.0303 15.5303C17.171 15.3897 17.25 15.1989 17.25 15V3C17.25 2.80109 17.171 2.61032 17.0303 2.46967C16.8897 2.32902 16.6989 2.25 16.5 2.25ZM15.75 14.25H2.25V7.10775L8.721 9.69675C8.90022 9.76775 9.09978 9.76775 9.279 9.69675L15.75 7.10775V14.25ZM15.75 5.49225L9 8.19225L2.25 5.49225V3.75H15.75V5.49225Z"
            fill="#747474"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className={"p-5 border border-[#F2F2F2] rounded-[12px] bg-white"}>
      <h3 className={"text-primary text-20 font-medium leading-7 mb-7"}>
        Patient Details
      </h3>
      <div className={"flex items-center gap-10 flex-wrap"}>
        {infoData.map((info) => (
          <div className={"flex gap-3 items-center"} key={info.id}>
            {info.icon}
            <p className={"min-w-max font-medium leading-6 break-words "}>
              {info.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
const PaymentSection = ({
  setPaymentType,
  paymentType,
  selectedCard,
  setSelectedCard,
}: {
  setPaymentType: Dispatch<SetStateAction<PaymentTypes>>;
  paymentType: PaymentTypes;
  selectedCard: string | null;
  setSelectedCard: Dispatch<SetStateAction<string | null>>;
}) => {
  const { data: userCards, isPending } = useQuery({
    queryKey: ["user-cards"],
    queryFn: UserApi.getUserCards,
  });
  const paymentData: {
    type: PaymentTypes;
    label: string;
    icon: (type: PaymentTypes) => React.JSX.Element;
  }[] = [
    {
      type: "CARD",
      label: "Card",
      icon: (type: PaymentTypes) => {
        return (
          <CardIcon
            className={clsx(
              paymentType === type ? "fill-[#099D2E]" : "fill-[#747474]",
            )}
          />
        );
      },
    },
    {
      type: "CASH",
      label: "Cash",
      icon: (type: PaymentTypes) => {
        return (
          <CashIcon
            className={clsx(
              paymentType === type ? "fill-[#099D2E]" : "fill-[#747474]",
            )}
          />
        );
      },
    },
  ];
  return (
    <div className={"p-5 border border-[#F2F2F2] rounded-[12px] bg-white mt-6"}>
      <h3 className={"text-primary text-20 font-medium leading-7 mb-7"}>
        Payment Methods
      </h3>
      <div className={"flex items-center gap-7 flex-wrap"}>
        {paymentData.map((type) => (
          <div
            onClick={() => {
              if (type.type === paymentType) return;

              setPaymentType(type.type);
            }}
            key={type.type}
            className={clsx(
              " h-[72px] p-7 flex items-center justify-center gap-2.5 rounded-[4px] cursor-pointer trans",
              paymentType === type.type
                ? "border-2 border-[#099D2E] "
                : "border border-[#A8A8A8]",
            )}
          >
            {type.icon(type.type)}
            <p
              className={clsx(
                paymentType === type.type ? "text-[#099D2E]" : "text-[#747474]",
              )}
            >
              {type.label}
            </p>
          </div>
        ))}
      </div>
      {!isPending && (
        <>
          {paymentType === "CARD" && (
            <>
              {!!userCards?.data.data.length && (
                <div>
                  <p className={"mt-6 text-16 font-medium mb-5"}>
                    Yadda saxlanılan kartlar
                  </p>
                  <div className={"max-w-[400px] w-full"}>
                    <label
                      htmlFor={"dont-save"}
                      className={
                        "flex justify-between py-4 border-b border-b-[#D8D8E4]"
                      }
                    >
                      <div className={"flex items-center gap-4"}>
                        <input
                          name={"card"}
                          id={"dont-save"}
                          type={"radio"}
                          checked={!selectedCard}
                          onChange={() => setSelectedCard(null)}
                          className={"w-6 h-6 accent-primary"}
                        />
                        <p className={"text-[#707587] text-14"}>
                          Yadda saxlamadan ödə
                        </p>
                      </div>
                    </label>
                    {userCards.data.data.map((card) => (
                      <label
                        htmlFor={card.id}
                        key={card.id}
                        className={
                          "flex justify-between py-4 border-b border-b-[#D8D8E4]"
                        }
                      >
                        <div className={"flex items-center gap-4"}>
                          <input
                            name={"card"}
                            id={card.id}
                            checked={selectedCard === card.cardUuid}
                            onChange={() => setSelectedCard(card.cardUuid)}
                            type={"radio"}
                            className={"w-6 h-6 accent-primary"}
                          />
                          <p className={"text-[#707587] text-14"}>{card.pan}</p>
                        </div>
                        <p>{card.brand}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default CheckoutPage;
