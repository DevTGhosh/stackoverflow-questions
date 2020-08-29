import React from "react";
import { useInfiniteQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { Stack } from "@chakra-ui/core";
import { getStackQuestions } from "../../api/stackOverflowApi";
import { Item, PaginatedApiResponse } from "../../api/stackOverflowApiType";
import BoxWithModal from "../ui/BoxWithModal";

//Added types for the results of useInfiniteQuery
interface Error {
  message?: string;
}
interface InfiniteQuery {
  status: string;
  data?: PaginatedApiResponse[];
  error?: Error | null | undefined;
  isFetching?: boolean;
  isFetchingMore?: false | "previous" | "next" | undefined;
  fetchMore?: any;
  canFetchMore?: boolean;
}

export default function QuestionList() {
  // Using react-query to fetch the data and use infinite loading by fetching the api with update page number using getFetchMore
  const {
    status,
    data,
    error,
    fetchMore,
    canFetchMore,
  }: InfiniteQuery = useInfiniteQuery("questions", getStackQuestions, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.nextPageNumber,
    staleTime: 1000 * 60 * 60 * 24 * 365,
  });
  //Shows error or loading and the resutant list if api is successfull
  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }
  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return (
    <Stack spacing={8}>
      <>
        {/* The data from the api calls are stored in an array */}
        {data?.map((page: any, i: any) => (
          <React.Fragment key={i}>
            {/* Displays result of 1 api call */}
            {page?.data?.items?.map((item: Item) => (
              <BoxWithModal
                question={item.title}
                date={item.creation_date.toString()}
                author={item.owner.display_name}
                link={item.link}
              />
            ))}
          </React.Fragment>
        ))}
      </>
      <ReactQueryDevtools initialIsOpen={false} />
    </Stack>
  );
}
