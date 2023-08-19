const applyDiff = (parent, realNode, virtualNode) => {
  const updateAttributes = (realNode, virtualNode) => {
    for (const { name, value } of [...virtualNode.attributes]) {
      if (value !== realNode.getAttribute(name)) realNode.setAttribute(name, value);
    }

    for (const { name } of [...realNode.attributes]) {
      if (virtualNode.getAttribute(name) === undefined) realNode.removeAttribute(name);
    }
  };

  const updateDOM = (parent, virtualNode, realNode) => {
    if (!virtualNode && realNode) return realNode.remove();

    if (virtualNode && !realNode) return parent.appendChild(virtualNode);

    if (virtualNode instanceof Text && realNode instanceof Text) {
      if (realNode.nodeValue === virtualNode.nodeValue) return;

      realNode.nodeValue = virtualNode.nodeValue;
      return;
    }

    if (virtualNode.nodeName !== realNode.nodeName) {
      const index = [...parent.childNodes].indexOf(realNode);

      realNode.remove();
      parent.appendChild(virtualNode, index);

      return;
    }

    updateAttributes(realNode, virtualNode);

    const newChildNodes = [...virtualNode.childNodes];
    const oldChildNodes = [...realNode.childNodes];

    const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);

    for (let i = 0; i < maxLength; i++) {
      updateDOM(realNode, newChildNodes[i], oldChildNodes[i]);
    }
  };

  const diffRender = () => {
    const maxLength = Math.max(virtualNode.length, realNode.length);

    for (let i = 0; i < maxLength; i++) {
      updateDOM(parent, virtualNode[i], realNode[i]);
    }
  };

  diffRender();
};

export default applyDiff;
