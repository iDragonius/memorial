import React, { FC, useEffect } from "react";
import Head from "next/head";
import Sidebar from "@/components/layouts/profile/ui/Sidebar";
import { useAuth } from "@/hooks/use-auth";

export interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  useAuth();
  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <main className={"box mt-3"}>
        <Sidebar />
      </main>
    </>
  );
};

export default ProfilePage;
