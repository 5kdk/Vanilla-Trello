let rootComponentInstance = null;

const render = (RootComponent, $container) => {
  if (RootComponent) rootComponentInstance = new RootComponent();

  const domString = rootComponentInstance.render();
  $container.innerHTML = domString;
};

export default render;
