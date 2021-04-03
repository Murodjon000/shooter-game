import axios from "axios";

const craeteGame = async () => {
  const game = {
    name: "Star Wars new",
  };

  const dataGame = await axios
    .post(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/",
      game
    )
    .then((response) => response);

  console.log(dataGame);

  return dataGame;
};

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

  console.log(data, "userScore");

  return data;
};

const setData = async (player, score) => {
  const userData = { user: player, score: score };
  const message = await userScore(userData);
  return message;
};

const getGameResult = async () => {
  const data = await axios
    .get(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$G3cxwXD1OYTkCI4kaSNO/scores/"
    )
    .then((response) => response.data)
    .catch((error) => error);
  console.log(data.result, "userScoreResult");
  return data.result;
};

const getData = async () => {
  const data = await getGameResult();
  craeteGame();
  return data.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 5);
};

export { setData, getData };
