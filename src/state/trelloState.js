import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const KEY = 'trelloAppState';

const initialState = [
  {
    id: 1,
    title: '해야할 일을 작성해보세요.',
    cards: [
      { id: 1, title: 'React', description: 'my task' },
      { id: 2, title: 'TypeScript', description: '' },
    ],
  },
  {
    id: 2,
    title: '진행중인 작업을 이동해보세요.',
    cards: [{ id: 3, title: 'Algorithm', description: '' }],
  },
  {
    id: 3,
    title: '구체적인 작업 내용을 작성해보세요.',
    cards: [
      { id: 4, title: 'HTML', description: '' },
      { id: 5, title: 'CSS', description: '' },
      { id: 6, title: 'JavaScript', description: '' },
    ],
  },
];

export const setTrelloState = newState => {
  const serialized = JSON.stringify(newState);
  setLocalStorage(KEY, serialized);
};

export const getTrelloState = () => {
  const deserialized = JSON.parse(getLocalStorage(KEY));

  return deserialized ?? initialState;
};
