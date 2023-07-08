import Component from '../../../core/Component.js';

class Main extends Component {
  render() {
    const trello = this.props;

    // prettier-ignore
    return `
      <main>
      ${trello.map(({ id, title, cards }, index) => `
        <ul data-list-index="${index}" data-list-id="${id}">
          <h1>${title}</h1>
          ${cards.map(({id, title, description }) => `
          <li data-card-id="${id}">
            <h2>${title}</h2>
            ${description && `<p>${description}</p>`}
          </li>`).join('')}
        </ul>`).join('')}
        <div>
          <button>+ Add a card</button>
        </div>
      </main>
      `;
  }
}

export default Main;
