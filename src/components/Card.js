import Component from '../../core/Component.js';

class Card extends Component {
  render() {
    const { id, title } = this.props;

    return `
      <li data-card-id="${id}" class="card">
        <h2 class="card-title">${title}</h2>
      </li>`;
  }
}
export default Card;
