import { ReactNode } from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

// type NormalQuery = {
//   queryKey: QueryKey;
//   queryFn: QueryFunction<unknown>;
// };

// type InfiniteQuery = {
//   queryKey: QueryKey;
//   queryFn: QueryFunction<unknown>;
//   initialPageParam: unknown;
//   isInfiniteQuery: true;
// };

type HydrationProviderProps = {
  queries: {
    queryKey: QueryKey;
    queryFn: () => void;
    initialPageParam?: never;
    isInfiniteQuery?: boolean;
  }[];
  //   queryKey: QueryKey[];
  //   queryFn: () => void;
  isInfiniteQuery?: boolean;
  children: ReactNode;
  //   initialPageParam?: never;
};

export default async function HydrationProvider({
  queries,
  children,
  //   isInfiniteQuery = false,
  //   initialPageParam,
}: HydrationProviderProps) {
  const queryClient = new QueryClient();

  // prefetch 모든 쿼리
  await Promise.all(
    queries.map((query) => {
      if (query.isInfiniteQuery) {
        return queryClient.prefetchInfiniteQuery({
          queryKey: query.queryKey,
          queryFn: query.queryFn,
          initialPageParam: query.initialPageParam,
        });
      }
      return queryClient.prefetchQuery({
        queryKey: query.queryKey,
        queryFn: query.queryFn,
      });
    })
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
