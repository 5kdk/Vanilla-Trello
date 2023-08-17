import Component from '../core/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import { appendCard, appendList, findList, updateListTitle } from './state/controller.js';
import { getTrelloState, setTrelloState } from './state/trelloState.js';

class App extends Component {
  constructor() {
    super();

    this.state = getTrelloState();
  }

  render() {
    const header = new Header();
    const main = new Main(this.state);

    return `
      ${header.render()}
      ${main.render()}
      `;
  }

  addEventListener() {
    return [
      {
        type: 'beforeunload',
        selector: 'window',
        handler: () => setTrelloState(this.state),
      },
      {
        type: 'click',
        selector: null,
        handler: this.onClick.bind(this),
      },
      {
        type: 'submit',
        selector: null,
        handler: this.onSubmit.bind(this),
      },
      {
        type: 'keydown',
        selector: null,
        handler: this.onKeydown.bind(this),
      },
      {
        type: 'focusout',
        selector: null,
        handler: this.onFocusout.bind(this),
      },
    ];
  }

  // Client Funcs
  getListId($elem) {
    return +$elem.closest('.list').dataset.listId;
  }

  toggleCardCreator(listId) {
    const lists = this.state.lists.map(list =>
      list.id === listId ? { ...list, isOpenCardCreator: !list.isOpenCardCreator } : list
    );

    this.setState({ lists });
  }

  toggleListCreator() {
    this.setState({ isOpenListCreator: !this.state.isOpenListCreator });
  }

  // Events
  onClick(e) {
    if (e.target.matches('.card-creator-opener') || e.target.matches('.card-creator-closer')) {
      this.toggleCardCreator(this.getListId(e.target));
      return;
    }

    if (e.target.matches('.list-creator-opener') || e.target.matches('.list-creator-closer')) {
      this.toggleListCreator();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const $textarea = e.target.querySelector('textarea');
    const value = $textarea.value.trim();

    if (e.target.matches('.card-creator')) {
      if (value === '') return;

      const listId = this.getListId(e.target);
      const lists = appendCard(this.state.lists, listId, value);
      $textarea.value = '';

      this.setState({ lists });
      return;
    }

    if (e.target.matches('.list-creator')) {
      if (value === '') return;

      const lists = appendList(this.state.lists, value);

      $textarea.value = '';

      this.setState({ lists });
    }
  }

  onKeydown(e) {
    if (e.key !== 'Escape' && e.key !== 'Enter') return;

    if (e.key === 'Escape') {
      if (e.target.matches('.new-card-title')) {
        this.toggleCardCreator(this.getListId(e.target));
        return;
      }

      if (e.target.matches('.new-list-title')) {
        this.toggleListCreator();
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      const value = e.target.value.trim();

      if (e.target.matches('.new-card-title') || e.target.matches('.new-list-title')) {
        if (value !== '') e.target.closest('form').querySelector('button').click();
      }

      e.target.blur();
    }
  }

  onFocusout(e) {
    if (!e.target.matches('.list-title')) return;

    const listId = this.getListId(e.target);
    const prevListTitle = findList(this.state.lists, listId).title;
    const newListTitle = e.target.value.trim();

    if (newListTitle === '') {
      e.target.value = prevListTitle;
      return;
    }

    if (prevListTitle !== newListTitle) {
      const lists = updateListTitle(this.state.lists, listId, newListTitle);
      this.setState({ lists });
    }
  }
}

export default App;
