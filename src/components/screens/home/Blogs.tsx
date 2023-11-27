import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogApi } from "@/lib/api/blog.api";
import Link from "next/link";
import { Constants } from "@/lib/constants";
import Image from "next/image";

export interface BlogsProps {}

const Blogs: FC<BlogsProps> = () => {
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => BlogApi.getBlogs({ params: {} }),
  });
  return (
    <div className={"box"}>
      <div className={"min-[1680px]:mx-[140px] mb-[80px]"}>
        <h2
          className={
            "text-24 sm:text-32 mb:text-40 text-secondary font-semibold  mb-3 sm:mb-6 mb:mb-10"
          }
        >
          Bloqlar
        </h2>
        <div
          className={
            " gap-5  grid grid-cols-1 sm:grid-cols-2 min-[1680px]:px-24"
          }
        >
          {blogs?.data.data.map((blog) => (
            <Link
              href={`/blog/${blog.id}`}
              target={"_blank"}
              key={blog.id}
              className={
                "bg-[#E8F5FF] px-6 py-8 rounded-[16px] trans border-2 border-[#E8F5FF] hover:border-primary"
              }
            >
              <h3 className={"text-secondary text-20 font-bold"}>
                {blog.name}
              </h3>
              <p className={"text-[#082E72] mt-5"}>{blog.shortDescription}</p>
              <div className={"flex justify-between mt-5"}>
                <div
                  className={
                    "flex items-center  gap-3 text-primary font-medium "
                  }
                >
                  Read More{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.707 18.707C16.5184 18.8892 16.2658 18.99 16.0036 18.9877C15.7414 18.9854 15.4906 18.8802 15.3052 18.6948C15.1198 18.5094 15.0146 18.2586 15.0123 17.9964C15.01 17.7342 15.1108 17.4816 15.293 17.293L19.586 13H2C1.73478 13 1.48043 12.8947 1.29289 12.7071C1.10536 12.5196 1 12.2652 1 12C1 11.7348 1.10536 11.4804 1.29289 11.2929C1.48043 11.1054 1.73478 11 2 11H19.586L15.293 6.70701C15.1108 6.51841 15.01 6.26581 15.0123 6.00361C15.0146 5.74141 15.1198 5.4906 15.3052 5.30519C15.4906 5.11978 15.7414 5.01461 16.0036 5.01234C16.2658 5.01006 16.5184 5.11085 16.707 5.29301L22.707 11.293C22.8945 11.4805 22.9998 11.7348 22.9998 12C22.9998 12.2652 22.8945 12.5195 22.707 12.707L16.707 18.707Z"
                      fill="#099B87"
                    />
                  </svg>
                </div>
                <p className={"text-[#B3B7BC]"}>
                  {new Intl.DateTimeFormat("az-Cyrl-AZ").format(
                    new Date(blog.updatedAt),
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
