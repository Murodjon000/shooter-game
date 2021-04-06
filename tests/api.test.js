import axios from 'axios';
import { setData, getData } from '../src/helpers/api';

jest.mock('axios');
test('should set data', async () => {
  const data = { data: { result: 'Leaderboard score created correctly.' } };
  axios.post.mockResolvedValue(data);
  const res = await setData('Jok', 100);
  axios.get.mockResolvedValue(res);
  const dataGet = getData();
  expect(dataGet.length).not.toBe(0);
});

test('should get the data from api correctly', async () => {
  const data = {
    data: {
      result: [
        { user: 'Paul', score: 800 },
        { user: 'John', score: 400 },
      ],
    },
  };
  axios.get.mockResolvedValue(data);
  const res = await getData();
  expect(res.length).toBe(2);
  expect(res[0].user).toBe('Paul');
  expect(res[0].score).toBe(800);
});
