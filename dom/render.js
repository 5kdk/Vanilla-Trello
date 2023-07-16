import eventHolder from './eventHolder.js';

let $root = null;
let rootComponentInstance = null;

const bindEventHandler = $root => {
  for (const { type, selector, handler } of eventHolder) {
    (selector === 'window' ? window : $root).addEventListener(type, handler);
  }
};

const render = (RootComponent, $container) => {
  if ($container) $root = $container;
  if (RootComponent) rootComponentInstance = new RootComponent();

  const domString = rootComponentInstance.render();

  $root.innerHTML = domString;

  bindEventHandler($root);
};

export default render;
