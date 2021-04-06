import axios from "axios";

const userScore = async (userData) => {
  const data = await axios
    .post(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$G3cxwXD1OYTkCI4kaSNO/scores/",
      userData
    )
    .then((response) => {
      response.data;
    })
    .catch((error) => error);
  return data;
};

console.log(userScore({ user: "Hele", score: 10 }));

const setData = async (player, score) => {
  const userData = { user: player, score: score };
  const message = await userScore(userData);
  console.log(message, "mes");
  return message;
};

const getGameResult = async () => {
  const data = await axios
    .get(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$G3cxwXD1OYTkCI4kaSNO/scores/"
    )
    .then((response) => response.data)
    .catch((error) => error);

  return data.result;
};

const getData = async () => {
  const data = await getGameResult();

  return data.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 5);
};

console.log(getData());

export { setData, getData };
