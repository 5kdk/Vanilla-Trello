import Component from '../../../core/Component.js';

class Header extends Component {
  render() {
    return `
    <header>
      <a class="logo" href="#">
        <img src="assets/logo.gif" alt="trello-logo">
        <img src="assets/logo-loading.gif" alt="trello-logo-loding">
      </a>
      <span class="logo-subtitle">powered by Vanilla JS</span>
    </header>`;
  }
}

export default Header;
