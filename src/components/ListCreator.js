import Component from '../../core/Component.js';

class ListCreator extends Component {
  render() {
    const { isOpenListCreator } = this.props;

    // prettier-ignore
    return isOpenListCreator ? `
      <form class="creator list-creator">
        <textarea class="new-list-title" placeholder="Enter list title..." autofocus></textarea>
        <div class="creator-controller">
          <button class="btn">Add list</button>
          <a class="bx bx-x bx-md list-creator-closer"></a>
        </div>
      </form>`
      : `
      <div class="list-creator-opener">+ Add another list</div>`;
  }
}

export default ListCreator;
