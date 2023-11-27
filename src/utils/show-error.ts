import ErrorMessages from "@/lib/error-messages";
import toast from "react-hot-toast";

export const ShowError = (err: any) => {
  console.log(err.response.data.data.messages);
  try {
    const errorMessage =
      err.response.data.data?.messages.length > 0
        ? err.response.data.data?.messages[0]
        : null;
    if (ErrorMessages[errorMessage]) {
      toast.error(ErrorMessages[errorMessage]);
    } else {
      toast.error("Gözlənilməyən xəta baş verdi");
    }
  } catch {
    toast.error("Gözlənilməyən xəta baş verdi");
  }
};
