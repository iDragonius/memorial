import "@/styles/globals.css";
import "@/styles/markdown.css";
import { CustomAppProps } from "@/shared/types/layout.types";
import { QueryCache, QueryClient } from "@tanstack/query-core";
import { Layouts } from "@/components/layouts";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { memorial } from "@/components/fonts";
import UserProvider from "@/components/ui/providers/UserProvider";
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: CustomAppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (localStorage.getItem("token")) {
          toast.error("Gözlənilməyən xəta baş verdi");
        }
      },
    }),
  });

  const Layout = Component.Layout ? Layouts[Component.Layout] : Layouts["Main"];
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <main className={memorial.className}>
          <Toaster />
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </main>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
