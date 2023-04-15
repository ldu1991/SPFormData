import { isNode, isNodeList } from './utils';

const convertToArray = (elements) => {
    if (Array.isArray(elements)) {
        return elements.filter(isNode);
    }
    if (isNode(elements)) {
        return [elements];
    }
    if (isNodeList(elements)) {
        return Array.from(elements);
    }
    if (typeof elements === 'string') {
        const query = document.querySelectorAll(elements);
        return Array.from(query);
    }
    return [];
};

export default convertToArray;
