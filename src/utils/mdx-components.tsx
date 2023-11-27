import React from "react";

export const MdxComponents = {
  h3: ({ node, ...props }: { node: unknown }) => (
    <h3 className={"text-20 font-medium mb-3 text-primary"} {...props} />
  ),
  p: ({ node, ...props }: { node: unknown }) => (
    <p
      className={"mb-2"}
      style={{
        marginBottom: "20px",
        color: "#424242",
        lineHeight: "32px",
        fontWeight: 500,
      }}
      {...props}
    />
  ),
  li: ({ node, ...props }: { node: unknown }) => (
    <li className={"ml-4 mb-1 list-disc"} {...props} />
  ),
};
