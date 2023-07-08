import Component from '../../../core/Component.js';

class Header extends Component {
  render() {
    return `
    <header>
      <a class="logo" href="#">
        <img src="assets/logo.gif" alt="trello-logo">
        <img src="assets/logo-loading.gif" alt="trello-logo-loding">
      </a>
    </header>`;
  }
}

export default Header;
