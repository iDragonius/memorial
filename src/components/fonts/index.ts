import localFont from "next/font/local";

export const memorial = localFont({
  src: [
    {
      path: "./Memorial/TTHoves-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./Memorial/TTHoves-Regular.ttf",
      weight: "400",
      style: "medium",
    },
    {
      path: "./Memorial/TTHoves-DemiBold.ttf",
      weight: "600",
      style: "medium",
    },
    {
      path: "./Memorial/TTHoves-Bold.ttf",
      weight: "700",
      style: "medium",
    },
  ],
});
