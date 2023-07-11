import Component from '../../core/Component.js';
import List from './List.js';

class Main extends Component {
  render() {
    const userData = this.props;

    // prettier-ignore
    return `
      <main>
        <div class="lists-container">
        ${userData.map((data, i) => `${new List({ data, i }).render()}`).join('')}
          <div class="list-composer-container">
            <button class="list-composer-opener">+ Add a card</div>
          </div>
        </div>
      </main>`;
  }
}

export default Main;
