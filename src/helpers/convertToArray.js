function isDomNode(x) {
    return typeof window.Node === 'object'
        ? x instanceof window.Node
        : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
}

function isDomNodeList(x) {
    const prototypeToString = Object.prototype.toString.call(x);
    const regex = /^\[object (HTMLCollection|NodeList|Object)]$/;

    return typeof window.NodeList === 'object'
        ? x instanceof window.NodeList
        : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || isDomNode(x[0]));
}

const convertToArray = (elements) => {
    if (elements instanceof Array) {
        return elements.filter(isDomNode);
    }
    if (isDomNode(elements)) {
        return [elements];
    }
    if (isDomNodeList(elements)) {
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
