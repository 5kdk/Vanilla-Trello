import Component from '../../core/Component.js';
import List from './List.js';

class Main extends Component {
  render() {
    const { lists } = this.props;

    // prettier-ignore
    return `
      <main>
        <div class="lists-container">
        ${lists.map((list, i) => `${new List({ list, i }).render()}`).join('')}
          <div class="list-creator-container">
            <button class="list-creator-opener">+ Add a card</div>
          </div>
        </div>
      </main>`;
  }
}

export default Main;
