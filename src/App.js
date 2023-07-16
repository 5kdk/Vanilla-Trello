import Component from '../core/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
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
    ];
  }

  getListId($elem) {
    return +$elem.closest('.list').dataset.listId;
  }

  toggleCardCreator(listId) {
    const lists = this.state.lists.map(list =>
      list.id === listId ? { ...list, isOpenCardCreator: !list.isOpenCardCreator } : list
    );

    this.setState({ lists });
  }

  onClick(e) {
    if (e.target.matches('.card-creator-opener') || e.target.matches('.card-creator-closer')) {
      this.toggleCardCreator(this.getListId(e.target));
    }
  }
}

export default App;
