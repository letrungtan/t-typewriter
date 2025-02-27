/*
* Copyright (c) 2025 Le Trung Tan <letrungtan94@gmail.com>
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const tTypewriter = (node, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let lastVisibleTextNode = null;
    if ((node === null || node === void 0 ? void 0 : node.nodeType) === Node.ELEMENT_NODE) {
        (_a = node === null || node === void 0 ? void 0 : node.classList) === null || _a === void 0 ? void 0 : _a.add('t-typewriter');
    }
    const _tTypewriter = (node, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        node.style.visibility = 'visible';
        if (node.childNodes.length > 1) {
            [...node.childNodes].forEach(childNode => {
                if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
                    const replaceNode = document.createElement('span');
                    replaceNode.innerHTML = childNode.nodeValue;
                    childNode.replaceWith(replaceNode);
                }
            });
        }
        for (let childNode of node.childNodes) {
            if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
                const childNodeClone = childNode.cloneNode(true);
                childNode.nodeValue = '';
                const parentNode = childNode.parentNode;
                if (parentNode) {
                    const visibleTextNode = document.createElement('span');
                    visibleTextNode.style.visibility = 'visible';
                    if (!options.isHideCursor) {
                        visibleTextNode.classList.add('t-current-typewriter-cursor');
                    }
                    const hiddenTextNode = document.createElement('span');
                    hiddenTextNode.style.visibility = 'hidden';
                    childNode.remove();
                    parentNode.appendChild(visibleTextNode);
                    parentNode.appendChild(hiddenTextNode);
                    if (childNodeClone.nodeValue) {
                        for (let [charIndex] of [...childNodeClone.nodeValue].entries()) {
                            if (childNodeClone.nodeValue) {
                                visibleTextNode.innerHTML = childNodeClone.nodeValue.substring(0, charIndex + 1);
                                hiddenTextNode.innerHTML = childNodeClone.nodeValue.substring(charIndex + 1);
                            }
                            yield new Promise(resolve => setTimeout(resolve, options.speed));
                        }
                    }
                    visibleTextNode.classList.remove('t-current-typewriter-cursor');
                    hiddenTextNode.remove();
                    lastVisibleTextNode = visibleTextNode;
                }
            }
            else {
                yield _tTypewriter(childNode, options);
            }
        }
    });
    yield _tTypewriter(node, options);
    if (lastVisibleTextNode && !options.hideCursorOnDone) {
        (_b = lastVisibleTextNode === null || lastVisibleTextNode === void 0 ? void 0 : lastVisibleTextNode.classList) === null || _b === void 0 ? void 0 : _b.add('t-current-typewriter-cursor');
    }
});
