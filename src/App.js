import Component from '../core/Component.js';
import Header from './components/Header/index.js';
import Main from './components/Main/index.js';
import { getTrelloState } from './state/trelloState.js';

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
}

export default App;
