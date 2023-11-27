import localFont from "next/font/local";

export const memorial = localFont({
  src: [
    {
      path: "./memorial/TTHoves-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./memorial/TTHoves-Regular.ttf",
      weight: "400",
      style: "medium",
    },
    {
      path: "./memorial/TTHoves-DemiBold.ttf",
      weight: "600",
      style: "medium",
    },
    {
      path: "./memorial/TTHoves-Bold.ttf",
      weight: "700",
      style: "medium",
    },
  ],
});
