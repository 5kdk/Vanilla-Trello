import { render, eventHolder } from '../dom/index.js';

class Component {
  constructor(props) {
    this.props = props;
    this.#holdEvents();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    render();
  }

  #holdEvents() {
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      if (event.selector === 'window' || event.selector === null) {
        eventHolder.push(event);
        continue;
      }

      const duplicated = eventHolder.some(({ type, selector }) => type === event.type && selector === event.selector);

      if (duplicated) return;

      eventHolder.push(event);
    }
  }

  render() {
    throw new Error(`Component의 서브 클래스는 DOMString을 반환하는 'render' 메서드를 구현해야 합니다.`);
  }
}

export default Component;
