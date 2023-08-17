import Component from '../../core/Component.js';
import List from './List.js';
import ListCreator from './ListCreator.js';
import TrashCan from './TrashCan.js';

class Main extends Component {
  render() {
    const { lists, isOpenListCreator } = this.props;

    // prettier-ignore
    return `
      <main>
        <div class="lists-container">
        ${lists.map((list, i) => `${new List({ list, i }).render()}`).join('')}
        </div>
        <div class="list-creator-container">${new ListCreator({ isOpenListCreator }).render()}</div>
        <div class="trash-can-container">${new TrashCan().render()}</div>
      </main>`;
  }
}

export default Main;
