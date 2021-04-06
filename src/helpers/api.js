import axios from 'axios';

const userScore = async (userData) => {
  const data = await axios
    .post(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$G3cxwXD1OYTkCI4kaSNO/scores/',
      userData,
    )
    .then((response) => response.data)
    .catch((error) => error);
  return data;
};

const setData = async (player, scores) => {
  const userData = { user: player, score: scores };
  const message = await userScore(userData);

  return message;
};

const getGameResult = async () => {
  const data = await axios
    .get(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/$G3cxwXD1OYTkCI4kaSNO/scores/',
    )
    .then((response) => response.data)
    .catch((error) => error);

  return data.result;
};

const getData = async () => {
  const data = await getGameResult();

  return data.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 5);
};

export { setData, getData };
