import Component from '../../core/Component.js';
import Card from './Card.js';

class List extends Component {
  render() {
    const { list, i } = this.props;
    const { title, id, cards, isOpenCardCreator } = list;

    // prettier-ignore
    return `
      <div class="list" data-list-id="${id}">
        <div class="list-container">
          <textarea class="list-title">${title}</textarea>
          <ul data-list-index="${i}" data-list-id="${id}">
            ${cards.map(card => `${new Card(card).render()}`).join('')}
          </ul>
          ${isOpenCardCreator ? `
          <form class="card-creator">
            <textarea class="new-card-title" placeholder="Enter a title for this card..." autofocus></textarea>
            <div class="creator-controller">
              <button class="btn">Add card</button>
              <a class="bx bx-x bx-md card-creator-closer"></a>
            </div>
          </form>`
          : `
          <button class="card-creator-opener">+ Add a card</button>`}
        </div>
      </div>`;
  }
}

export default List;
