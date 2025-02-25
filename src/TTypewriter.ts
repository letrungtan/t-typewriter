interface Options {
  speed?: number;
  isHideCursor?: boolean;
  hideCursorOnDone?: boolean;
}
export const tTypewriter = async (node: Node | null, options: Options): Promise<void> => {  
    let lastVisibleTextNode: HTMLElement | null = null;
    if (node?.nodeType === Node.ELEMENT_NODE) {
      (node as HTMLElement)?.classList?.add('t-typewriter');
    }  
    const _tTypewriter = async (node: Node | null, options: Options): Promise<void> => {  
        if (!node || node.nodeType !== Node.ELEMENT_NODE) {
          return
        }  
        (node as HTMLElement).style.visibility = 'visible';
        if (node.childNodes.length > 1) {
          [...node.childNodes].forEach(childNode => {
            if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
              const replaceNode = document.createElement('span')
              replaceNode.innerHTML = childNode.nodeValue
              childNode.replaceWith(replaceNode)
            }
          })
        }
        
        for (let childNode of node.childNodes) {
          if (childNode.nodeType === Node.TEXT_NODE &&childNode.nodeValue) {
            const childNodeClone = childNode.cloneNode(true);
            
            childNode.nodeValue = ''
            const newNode = document.createElement('span')
            const visibleTextNode = document.createElement('span')
            visibleTextNode.style.visibility = 'visible';
            if (!options.isHideCursor) {
              visibleTextNode.classList.add('t-current-typewriter-cursor')
            }
            const hiddenTextNode = document.createElement('span')
            hiddenTextNode.style.visibility = 'hidden';
            childNode.replaceWith(newNode)
            newNode.appendChild(visibleTextNode)
            newNode.appendChild(hiddenTextNode)
            if (childNodeClone.nodeValue) {
              for (let [charIndex] of [...childNodeClone.nodeValue].entries()) {
                if (childNodeClone.nodeValue) {
                  visibleTextNode.innerHTML = childNodeClone.nodeValue.substring(0, charIndex + 1)
                  hiddenTextNode.innerHTML = childNodeClone.nodeValue.substring(charIndex + 1)
                }
                await new Promise(resolve => setTimeout(resolve, options.speed))
              }
            }      
            visibleTextNode.classList.remove('t-current-typewriter-cursor')
            hiddenTextNode.remove()
            lastVisibleTextNode = visibleTextNode
          } else {
            await _tTypewriter(childNode, options)
          }
        }  
    };
    await _tTypewriter(node, options)
    if (lastVisibleTextNode && !options.hideCursorOnDone) {
        (lastVisibleTextNode as HTMLElement)?.classList?.add('t-current-typewriter-cursor');
    }
};