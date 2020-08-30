import React, { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Box, Stack, Spinner, Text } from "@chakra-ui/core";
import { getStackQuestions } from "../../api/stackOverflowApi";
import { Item, PaginatedApiResponse } from "../../api/stackOverflowApiType";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
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
    isFetching,
  }: InfiniteQuery = useInfiniteQuery("questions", getStackQuestions, {
    getFetchMore: (lastGroup) => lastGroup.nextPageNumber,
    staleTime: 1000 * 60 * 60 * 24 * 365,
  });

  const spinnerDiv = useRef<HTMLElement>(null);
  const stackDiv = useRef<HTMLDivElement>(null);

  // This hook takes in the following
  // target ref,
  // onIntersect:  function to be called when the ref is on sreen
  //  enabled: only calls the function if there are more Items to be fetched
  useIntersectionObserver({
    root: stackDiv,
    target: spinnerDiv,
    onIntersect: fetchMore,
    enabled: canFetchMore,
  });

  return (
    <>
      {status === "error" ? (
        <Text>{error?.message}</Text>
      ) : (
        <Stack spacing={8}>
          <>
            {/* The data from the api calls are stored in an array */}
            {data?.map((page: any, i: any) => (
              <React.Fragment key={i}>
                {/* Displays result of 1 api call */}
                {page?.data?.items?.map((item: Item) => (
                  <Stack spacing={8} ref={stackDiv}>
                    <BoxWithModal
                      question={item.title}
                      date={item.creation_date.toString()}
                      author={item.owner.display_name}
                      link={item.link}
                    />
                  </Stack>
                ))}
              </React.Fragment>
            ))}
            {/* Spinner button only shows during intial load and before all pages are loaded */}
            {canFetchMore || isFetching ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                pb={5}
                mb={5}
                ref={spinnerDiv}
              >
                <Spinner size="xl" color="blue.500" />
              </Box>
            ) : null}
          </>
        </Stack>
      )}
    </>
  );
}
