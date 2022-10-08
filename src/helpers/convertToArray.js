import { isNode, isNodeList } from './utils';

const convertToArray = (elements) => {
    if (elements instanceof Array) {
        return elements.filter(isNode);
    }
    if (isNode(elements)) {
        return [elements];
    }
    if (isNodeList(elements)) {
        return Array.prototype.slice.call(elements);
    }
    if (typeof elements === 'string') {
        try {
            const query = document.querySelectorAll(elements);
            return Array.prototype.slice.call(query);
        } catch (err) {
            return [];
        }
    }
    return [];
};

export default convertToArray;
