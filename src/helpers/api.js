import axios from "axios";

const userScore = async (userData) => {
  const data = await axios
    .post(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$xOwoSY152NCqczqPjpxw/scores/",
      userData
    )
    .then((response) => {
      response.data;
    })
    .catch((error) => error);

  return data.result;
};

const setData = async (player, score) => {
  const userData = { user: { name: player }, score: score };
  const message = await userScore(userData);
  return message;
};

const getGameResult = async () => {
  const data = await axios
    .get(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$xOwoSY152NCqczqPjpxw/scores/"
    )
    .then((response) => response.data.result)
    .catch((error) => error);

  return data;
};

const getData = async () => {
  const data = await getGameResult();
  const dataS = data.sort((a, b) => (a.score > b.score ? 1 : -1));
  console.log(dataS);
  return dataS;
};

export { setData, getData };
