// Data controll Funcs
const findAllCards = lists => lists.map(list => list.cards).flat();

const findList = (lists, listId) => lists.find(({ id }) => id === +listId);

const updateListTitle = (lists, listId, title) => lists.map(list => (list.id === +listId ? { ...list, title } : list));

const generateListId = lists => Math.max(...lists.map(list => list.id), 0) + 1;

const generateCardId = lists => Math.max(...findAllCards(lists).map(card => card.id), 0) + 1;

const appendCard = (lists, listId, title) => {
  const id = generateCardId(lists);
  const newCard = { id, title, description: '' };
  return lists.map(list => (list.id === +listId ? { ...list, cards: [...list.cards, newCard] } : list));
};

const appendList = (lists, title) => {
  const id = generateListId(lists);
  return [...lists, { id, title, cards: [] }];
};

const moveList = (lists, fromIndex, toIndex) => {
  const _lists = [...lists].filter((_, i) => i !== fromIndex);
  _lists.splice(toIndex, 0, lists[fromIndex]);

  return _lists;
};

export { findList, updateListTitle, appendCard, appendList, moveList };
