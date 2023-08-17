// Data handlers
const findAllCards = lists => lists.map(list => list.cards).flat();

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

export { appendCard, appendList };
