import { localScore, getLocalScore, storeScores } from "./storage_mock";

test("should be like this array [0,0] ", () => {
  const data = getLocalScore();
  expect(data[0]).toBe(0);
  expect(data[1]).toBe(0);
});

test("should store the array and show it", () => {
  const data = [100, 200];
  localScore(data);
  const scores = getLocalScore();
  expect(scores.length).toBe(data.length);
  expect(scores[1]).toBe(200);
  expect(scores[0]).toBe(100);
});

test("should store scores", () => {
  const scores = [10, 20, 600];
  localScore(scores);
  scores[0] = 3500;
  storeScores(scores[0]);
  const result = getLocalScore();
  expect(result.length).toBe(3);
  expect(result[0]).toBe(scores[0]);
  expect(result[1]).toBe(scores[0]);
});
