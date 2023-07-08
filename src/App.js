import Component from '../core/Component.js';
import Header from './components/Header/index.js';

class App extends Component {
  render() {
    const header = new Header();

    return `
      ${header.render()}
      `;
  }
}

export default App;
