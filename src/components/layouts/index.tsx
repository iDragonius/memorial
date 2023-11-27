import AuthLayout from "./auth";
import MainLayout from "./main";
import ProfileLayout from "./profile";

export const Layouts = {
  Main: MainLayout,
  Auth: AuthLayout,
  Profile: ProfileLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Auth" | "Profile"
