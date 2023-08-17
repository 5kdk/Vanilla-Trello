import Component from '../core/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import { appendCard, appendList, findList, updateListTitle } from './state/controller.js';
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
        type: 'dragstart',
        selector: null,
        handler: this.onDragstart.bind(this),
      },
      {
        type: 'dragover',
        selector: null,
        handler: this.onDragover.bind(this),
      },
      {
        type: 'dragend',
        selector: null,
        handler: this.onDragend.bind(this),
      },
      {
        type: 'click',
        selector: null,
        handler: this.onClick.bind(this),
      },
      {
        type: 'submit',
        selector: null,
        handler: this.onSubmit.bind(this),
      },
      {
        type: 'keydown',
        selector: null,
        handler: this.onKeydown.bind(this),
      },
      {
        type: 'focusout',
        selector: null,
        handler: this.onFocusout.bind(this),
      },
    ];
  }

  // Client Funcs
  getListIndex($elem) {
    return +$elem.closest('.list').dataset.listIndex;
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

  toggleListCreator() {
    this.setState({ isOpenListCreator: !this.state.isOpenListCreator });
  }

  appendDragImage() {
    const $ghost = document.createElement('div');
    const $ghostChild = this.$dragTarget.cloneNode(true);

    $ghostChild.classList.add('ghost');

    $ghost.appendChild($ghostChild);
    document.body.appendChild($ghost);

    return $ghost;
  }

  removeDragImage() {
    const $ghost = document.querySelector('.ghost').parentNode;
    document.body.removeChild($ghost);
  }

  // Events
  onClick(e) {
    if (e.target.matches('.card-creator-opener') || e.target.matches('.card-creator-closer')) {
      this.toggleCardCreator(this.getListId(e.target));
      return;
    }

    if (e.target.matches('.list-creator-opener') || e.target.matches('.list-creator-closer')) {
      this.toggleListCreator();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const $textarea = e.target.querySelector('textarea');
    const value = $textarea.value.trim();

    if (e.target.matches('.card-creator')) {
      if (value === '') return;

      const listId = this.getListId(e.target);
      const lists = appendCard(this.state.lists, listId, value);
      $textarea.value = '';

      this.setState({ lists });
      return;
    }

    if (e.target.matches('.list-creator')) {
      if (value === '') return;

      const lists = appendList(this.state.lists, value);

      $textarea.value = '';

      this.setState({ lists });
    }
  }

  onKeydown(e) {
    if (e.key !== 'Escape' && e.key !== 'Enter') return;

    if (e.key === 'Escape') {
      if (e.target.matches('.new-card-title')) {
        this.toggleCardCreator(this.getListId(e.target));
        return;
      }

      if (e.target.matches('.new-list-title')) {
        this.toggleListCreator();
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      const value = e.target.value.trim();

      if (e.target.matches('.new-card-title') || e.target.matches('.new-list-title')) {
        if (value !== '') e.target.closest('form').querySelector('button').click();
      }

      e.target.blur();
    }
  }

  onFocusout(e) {
    if (!e.target.matches('.list-title')) return;

    const listId = this.getListId(e.target);
    const prevListTitle = findList(this.state.lists, listId).title;
    const newListTitle = e.target.value.trim();

    if (newListTitle === '') {
      e.target.value = prevListTitle;
      return;
    }

    if (prevListTitle !== newListTitle) {
      const lists = updateListTitle(this.state.lists, listId, newListTitle);
      this.setState({ lists });
    }
  }

  onDragstart(e) {
    this.$dragTarget = e.target;
    const $dragImage = this.appendDragImage();

    e.dataTransfer.setDragImage($dragImage, e.offsetX * 1.5, e.offsetY * 1.5);

    e.dataTransfer.effectAllowed = 'move';

    this.fromListIndex = this.getListIndex(this.$dragTarget);
    this.fromListId = this.getListId(this.$dragTarget);

    this.$dragTarget.classList.add('dragging');
  }

  onDragover(e) {
    const $dropTarget = e.target;
    const $dropzone = $dropTarget.closest('.list');

    e.preventDefault();

    if ($dropzone === null) return;

    if (this.$dragTarget.matches('.list')) {
      if ($dropzone === this.$dragTarget) return;

      const [fromListIndex, toListIndex] = [this.getListIndex(this.$dragTarget), this.getListIndex($dropzone)];

      this.$dragTarget.parentNode.insertBefore(
        this.$dragTarget,

        fromListIndex > toListIndex ? $dropzone : $dropzone.nextElementSibling
      );

      [...document.querySelectorAll('.list')].forEach(($list, i) => {
        $list.dataset.listIndex = i;
      });
    }
  }

  onDragend() {
    this.$dragTarget.classList.remove('dragging');
    this.removeDragImage();
  }
}

export default App;
