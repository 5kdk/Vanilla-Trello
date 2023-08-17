import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const KEY = 'trelloAppState';

const initialState = {
  lists: [
    {
      id: 1,
      title: '해야할 일을 작성해보세요.',
      cards: [
        { id: 1, title: 'React', description: 'my task' },
        { id: 2, title: 'TypeScript', description: '' },
      ],
      isOpenCardCreator: false,
    },
    {
      id: 2,
      title: '진행중인 작업을 이동해보세요.',
      cards: [{ id: 3, title: 'Algorithm', description: '' }],
      isOpenCardCreator: false,
    },
    {
      id: 3,
      title: '구체적인 작업 내용을 작성해보세요.',
      cards: [
        { id: 4, title: 'HTML', description: '' },
        { id: 5, title: 'CSS', description: '' },
        { id: 6, title: 'JavaScript', description: '' },
      ],
      isOpenCardCreator: false,
    },
  ],
  isOpenListCreator: false,
  modal: {
    isOpen: false,
    isEditDesc: false,
    listId: null,
    cardId: null,
  },
};

export const setTrelloState = newState => {
  const serialized = JSON.stringify(newState);
  setLocalStorage(KEY, serialized);
};

export const getTrelloState = () => {
  const deserialized = JSON.parse(getLocalStorage(KEY));

  return deserialized ?? initialState;
};
