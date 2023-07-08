import eventHolder from './eventHolder.js';

let rootComponentInstance = null;

const bindEventHandler = $root => {
  for (const { type, selector, handler } of eventHolder) {
    (selector === 'window' ? window : $root).addEventListener(type, handler);
  }
};

const render = (RootComponent, $container) => {
  if (RootComponent) rootComponentInstance = new RootComponent();

  const domString = rootComponentInstance.render();
  $container.innerHTML = domString;

  bindEventHandler($container);
};

export default render;
