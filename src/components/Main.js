import Component from '../../core/Component.js';

class Main extends Component {
  render() {
    const trello = this.props;

    // prettier-ignore
    return `
      <main>
      ${trello.map(({ id, title, cards }, index) => `
        <div class="lists-container">
          <div class="list">
            <div class="list-container">
              <textarea class="list-title">${title}</textarea>
              <ul data-list-index="${index}" data-list-id="${id}">
              ${cards.map(({id, title }) => `
                <li data-card-id="${id}" class="card">
                  <h2 class="card-title">${title}</h2>
                </li>`).join('')}
              </ul>
              <button class="card-composer-opener">+ Add a card</button>
            </div>
          </div>
        </div>`).join('')}
        <div class="list-composer-container">
          <button class="list-composer-opener">+ Add a card</div>
        </div>
      </main>
      `;
  }
}

export default Main;
