import axios from "axios";
export async function getStackQuestions(pageNumber = 1) {
  const url = `https://api.stackexchange.com/2.2/questions?page=${pageNumber}&pagesize=10&order=desc&sort=creation&site=stackoverflow`;
  const { data } = await axios.get(url);
  return data;
}
