import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CollectionApi, CollectionProps } from "@/lib/api/collection.api";
import BranchItemModal from "@/components/ui/modals/BranchItemModal";
import BranchDoctorModal from "@/components/ui/modals/BranchDoctorModal";
import { ViewedItemProps } from "@/components/screens/branch/catalog/CategoryItems";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChevronLeftIcon } from "@/components/icons";
import Image from "next/image";
import { Constants } from "@/lib/constants";
export interface CollectionsProps {}

const Collections: FC<CollectionsProps> = () => {
  const { data: collectionsData } = useQuery({
    queryKey: ["collections"],
    queryFn: CollectionApi.getCollections,
  });
  const [viewedItem, setViewedItem] = useState<ViewedItemProps>({
    type: null,
    data: null,
  });
  return (
    <>
      {viewedItem.type === "SERVICE" && viewedItem.data && (
        <BranchItemModal
          data={viewedItem.data}
          close={() => setViewedItem({ type: null, data: null })}
        />
      )}
      {viewedItem.type === "DOCTOR" && viewedItem.data && (
        <BranchDoctorModal
          data={viewedItem.data}
          close={() => setViewedItem({ type: null, data: null })}
        />
      )}
      <div className={"box mb-20 mt-16"}>
        <div className={"min-[1680px]:mx-[140px] flex flex-col gap-[80px]"}>
          {collectionsData?.data.data.map((collection) => {
            if (collection.type === "DOCTOR" && !!collection.items.length) {
              return (
                <DoctorCollection
                  collection={collection}
                  key={collection.id}
                  setViewedItem={setViewedItem}
                />
              );
            } else if (
              collection.type === "SERVICE" &&
              !!collection.items.length
            ) {
              return (
                <ServiceCollection
                  collection={collection}
                  key={collection.id}
                  setViewedItem={setViewedItem}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export const ServiceCollection = ({
  collection,
  setViewedItem,
}: {
  collection: CollectionProps;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;
}) => {
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  return (
    <div>
      <div className={"flex justify-between items-center"}>
        <h2
          className={
            "mb-10 text-secondary text-24 sm:text-40  font-semibold leading-[48px]"
          }
        >
          {collection.locales[0].name}
        </h2>

        <div
          className={
            "w-[78px] flex justify-between border border-[#DADADA] rounded-[4px] h-10 items-center"
          }
        >
          <div onClick={prevSlide} className={" cursor-pointer"}>
            <ChevronLeftIcon />
          </div>
          <div className={"w-[1px] h-8 bg-[#DADADA]"} />
          <div onClick={nextSlide} className={" cursor-pointer"}>
            <ChevronLeftIcon className={"rotate-180"} />
          </div>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          900: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {collection.items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() =>
                setViewedItem({
                  data: item,
                  type: "SERVICE",
                })
              }
              className={
                " cursor-pointer border border-[#DADADA] trans rounded-[8px] bg-white hover:border-primary p-4 h-[168px] flex flex-col justify-between"
              }
            >
              <h4 className={"text-[#8B8B8B]"}>Kodu: {item.details.code}</h4>
              <div>
                <p className={"text-14"}>{item.item.details.locales[0].name}</p>
                <div className={"flex gap-4 mt-5"}>
                  {item.price === item.promotedPrice ? (
                    <p className={"text-20 font-medium leading-4 text-primary"}>
                      {item.promotedPrice / 100} azn
                    </p>
                  ) : (
                    <>
                      <p
                        className={
                          "text-[#9497AA] line-through text-20 font-medium leading-4"
                        }
                      >
                        {item.price / 100} azn
                      </p>
                      <p
                        className={"text-20 font-medium leading-4 text-primary"}
                      >
                        {item.promotedPrice / 100} azn
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export const DoctorCollection = ({
  collection,
  setViewedItem,
}: {
  collection: CollectionProps;
  setViewedItem: Dispatch<SetStateAction<ViewedItemProps>>;
}) => {
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  return (
    <div>
      <div className={"flex justify-between items-center"}>
        <h2
          className={
            "mb-10 text-secondary text-24 sm:text-40 font-semibold leading-[48px]"
          }
        >
          {collection.locales[0].name}
        </h2>

        <div
          className={
            "w-[78px] flex justify-between border border-[#DADADA] rounded-[4px] h-10 items-center"
          }
        >
          <div onClick={prevSlide} className={" cursor-pointer"}>
            <ChevronLeftIcon />
          </div>
          <div className={"w-[1px] h-8 bg-[#DADADA]"} />
          <div onClick={nextSlide} className={" cursor-pointer"}>
            <ChevronLeftIcon className={"rotate-180"} />
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {collection.items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={""}>
              <Image
                src={Constants.fileApi + item.item.details.photo.id}
                alt={item.item.details.locales[0].name}
                width={304}
                height={260}
                className={"w-full"}
              />
            </div>
            <h3
              className={
                "text-center text-20 font-medium leading-[30px] mt-5 mb-1"
              }
            >
              {item.item.details.locales[0].name}
            </h3>
            <p
              className={
                "text-center text-[#747474] text-18 font-medium leading-[30px] mb-6"
              }
            >
              {item.item.details.catalog.locales[0].name}
            </p>
            <button
              onClick={() => {
                setViewedItem({
                  type: "DOCTOR",
                  data: item,
                });
              }}
              className={
                "flex justify-between w-[240px] bg-primary items-center mx-auto px-4 py-3 text-white font-semibold leading-6 rounded-[4px] outline-none hover:ring-4 hover:ring-primary hover:ring-opacity-70 focus:ring-4 focus:ring-primary focus:ring-opacity-70 mb-1 trans "
              }
            >
              <p>Qəbula yazıl</p>
              <span>{item.promotedPrice / 100} AZN</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Collections;
