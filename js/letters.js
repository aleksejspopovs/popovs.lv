(function () {
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let charNodes = []

      for (let char of node.nodeValue) {
        let charNode = document.createElement('span')
        charNode.classList.add('char')
        charNode.innerText = char
        charNodes.push(charNode)
      }

      node.replaceWith(...charNodes)

      for (let charNode of charNodes) {
        let {top, left, width, height} = charNode.getBoundingClientRect()
        charNode.dataset.orig_top = top
        charNode.dataset.orig_left = left
        charNode.dataset.width = width
        charNode.dataset.height = height
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(traverse)
    }
  }

  Array.from(document.getElementsByTagName('p')).forEach(traverse)

  for (let character of document.getElementsByClassName('char')) {
    character.style.position = 'absolute'
    character.style.top = `${character.dataset.orig_top}px`
    character.style.left = `${character.dataset.orig_left}px`
  }
})()
