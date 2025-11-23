import { ReactNode } from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
  QueryKey,
} from "@tanstack/react-query";

type HydrationProviderProps = {
  queryKey: QueryKey;
  queryFn: () => void;
  isInfiniteQuery?: boolean;
  children: ReactNode;
  initialPageParam?: never;
};

export default async function HydrationProvider({
  children,
  queryKey,
  queryFn,
  isInfiniteQuery = false,
  initialPageParam,
}: HydrationProviderProps) {
  const queryClient = new QueryClient();

  if (isInfiniteQuery) {
    await queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam,
    });
  } else {
    await queryClient.prefetchQuery({ queryKey, queryFn });
  }

  const dehydratedState = dehydrate(queryClient);
  console.log(queryClient.getQueryState(queryKey));
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
