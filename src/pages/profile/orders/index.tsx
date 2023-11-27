import React, { FC } from "react";
import Head from "next/head";
import { CustomPage } from "@/shared/types/layout.types";
import ProfileLayout from "@/components/layouts/profile";
import Title from "@/components/screens/profile/Back";
import { useQuery } from "@tanstack/react-query";
import { OrderApi, OrderProps } from "@/lib/api/order.api";
import OrderTable from "@/components/screens/profile/orders/OrderTable";
import CustomLoader from "@/components/ui/loader/CustomLoader";

export interface OrdersPageProps {}

const OrdersPage: CustomPage<OrdersPageProps> = () => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderApi.getUserOrders,
  });
  return (
    <ProfileLayout>
      <Head>
        <title>Sifarişlərim</title>
      </Head>
      <main
        className={
          "bg-white nb:border border-[#E3E3E3] w-full py-6 nb:px-8 mb-10 "
        }
      >
        <Title label={"Sifarişlərim"} />
        {isPending ? (
          <div className={"h-[300px] w-full flex items-center justify-center"}>
            <CustomLoader />
          </div>
        ) : (
          <OrderTable data={orders?.data.data as OrderProps[]} />
        )}
      </main>
    </ProfileLayout>
  );
};
export default OrdersPage;
