function isNode(x) {
    return typeof x === 'object' && x !== null && x.nodeType !== undefined && x.nodeName !== undefined && window.Node.prototype.isPrototypeOf(x);
}

function isNodeList(x) {
    const prototypeToString = Object.prototype.toString.call(x);
    const regex = /^\[object (HTMLCollection|NodeList|Object)]$/;

    return typeof window.NodeList === 'object'
        ? x instanceof window.NodeList
        : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || isNode(x[0]));
}

function isValid(str) {
    return /^[|,]+$/.test(str);
}

function isEmpty(value) {
    return typeof value !== 'string' || !value || !value.trim();
}

function isObject(obj) {
    return obj !== null && Object.getOwnPropertyNames(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export { isNode, isNodeList, isValid, isEmpty, isObject };
