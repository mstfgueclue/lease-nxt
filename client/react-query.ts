import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (query.meta?.isAuthRefresh) {
        return;
      }
      if (err instanceof Error) {
        queryClient.resetQueries();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: 4,
      onError: (err) => {
        if (err instanceof Error) {
          queryClient.resetQueries();
        }
      },
    },
  },
});
