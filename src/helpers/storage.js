const localScore = (score) => {
  const scoreJson = JSON.stringify(score);
  localStorage.setItem('scores', scoreJson);
};

const getLocalScore = () => {
  const score = localStorage.getItem('scores');
  let result = JSON.parse(score);

  if (result === null) {
    result = [1, 1];
    localScore(result);
  }

  return result;
};

const storeScores = (score) => {
  const localScoreArr = getLocalScore();
  localScoreArr[0] = score;
  localScoreArr[1] = Math.max(...localScoreArr);
  localScore(localScoreArr);
};

export { localScore, getLocalScore, storeScores };
