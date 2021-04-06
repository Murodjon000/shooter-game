import axios from "axios";
import { setData, getData } from "../src/helpers/api";

jest.mock("axios");
test("should set data", async () => {
  const data = { data: { result: "Leaderboard score created correctly." } };
  axios.post.mockResolvedValue(data);
  const res = await setData("John", 400);
  const dataGet = getData();
  expect(dataGet.length).not.toBe(0);
});
