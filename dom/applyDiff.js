const updateAttributes = (realNode, virtualNode) => {
  for (const { name, value } of [...virtualNode.attributes]) {
    if (!realNode.hasAttribute(name) || realNode.getAttribute(name) !== value) {
      realNode.setAttribute(name, value);
    }
  }

  for (const { name } of [...realNode.attributes]) {
    if (!virtualNode.hasAttribute(name)) realNode.removeAttribute(name);
  }
};

const updateDOM = (parentNode, realNode, virtualNode) => {
  if (virtualNode && !realNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (!virtualNode && realNode) {
    realNode.removeChild(realNode);
    return;
  }

  if (realNode.nodeType === Node.TEXT_NODE && virtualNode.nodeType === Node.TEXT_NODE) {
    if (realNode.textContent !== virtualNode.textContent) realNode.textContent = virtualNode.textContent;
    return;
  }

  if (realNode.nodeType === Node.COMMENT_NODE || virtualNode.nodeType === Node.COMMENT_NODE) return;

  if (realNode.nodeName !== virtualNode.nodeName) {
    parentNode.insertBefore(virtualNode, realNode);
    parentNode.removeChild(realNode);
    return;
  }

  if (virtualNode.nodeName !== realNode.nodeName) {
    const index = [...parentNode.childNodes].indexOf(realNode);

    realNode.remove();
    parentNode.appendChild(virtualNode, index);

    return;
  }

  updateAttributes(realNode, virtualNode);

  // eslint-disable-next-line no-use-before-define
  applyDiff(realNode, virtualNode);
};

const applyDiff = (realDOM, virtualDOM) => {
  const [realNodes, virtualNodes] = [[...realDOM.childNodes], [...virtualDOM.childNodes]];
  const max = Math.max(realNodes.length, virtualNodes.length);

  for (let i = 0; i < max; i++) {
    updateDOM(realDOM, realNodes[i], virtualNodes[i]);
  }
};

export default applyDiff;
