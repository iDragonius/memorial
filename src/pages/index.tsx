import Head from "next/head";
import Services from "@/components/screens/home/Services";
import Certificates from "@/components/screens/home/Certificates";
import Blogs from "@/components/screens/home/Blogs";
import Branches from "@/components/screens/home/Branches";
import About from "@/components/screens/home/About";
import Banner from "@/components/screens/home/Banner";
import { useIsFetching } from "@tanstack/react-query";
import React from "react";
import logoBig from "@/assets/logo-big.png";
import Image from "next/image";
import Collections from "@/components/screens/home/Collections";
export default function Home() {
  const isFetching = useIsFetching();
  const test = "test";
  return (
    <>
      <Head>
        <title>Memorial Hospital</title>
      </Head>
      <main>
        {isFetching ? (
          <div
            className={
              "fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[1000]"
            }
          >
            <Image
              src={logoBig}
              alt={"logo"}
              className={"sm:w-[400px] w-[300px]"}
            />
          </div>
        ) : (
          <>
            <Banner />
            <Services />
            <Collections />
            <About />
            <Branches />
            <Certificates />
            <Blogs />
          </>
        )}
      </main>
    </>
  );
}
