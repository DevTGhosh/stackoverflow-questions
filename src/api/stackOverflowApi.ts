import axios from "axios";
import { ApiResponse, PaginatedApiResponse } from "./stackOverflowApiType";

//Async function return a Promise which if successful will return data with type ApiResponse or a string of errors on failure
export async function getStackQuestions(key: string, pageNumber: number = 1) {
  console.log("pageNumber: ", pageNumber);
  const url: string = `https://api.stackexchange.com/2.2/questions?page=${pageNumber}&pagesize=10&order=desc&sort=creation&site=stackoverflow`;
  const { data }: { data: ApiResponse } = await axios.get(url);
  return { data: data, nextPageNumber: pageNumber + 1 };
}
