import Component from '../../core/Component.js';
import Card from './Card.js';

class List extends Component {
  render() {
    const { data, i } = this.props;
    const { title, id, cards } = data;

    // prettier-ignore
    return `
      <div class="list">
        <div class="list-container">
          <textarea class="list-title">${title}</textarea>
          <ul data-list-index="${i}" data-list-id="${id}">
            ${cards.map(card => `${new Card(card).render()}`).join('')}
          </ul>
          <button class="card-composer-opener">+ Add a card</button>
        </div>
      </div>`;
  }
}

export default List;
