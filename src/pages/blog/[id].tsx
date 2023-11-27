import React, { FC } from "react";
import Head from "next/head";

export interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = () => {
  return (
    <>
      <Head>
        <title>BlogPage</title>
      </Head>
      <main></main>
    </>
  );
};

export default BlogPage;
