function isNode(x) {
    return typeof window.Node === 'object'
        ? x instanceof window.Node
        : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
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
    return !value || !/[^\s]+/.test(value);
}

function isObject(obj) {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export { isNode, isNodeList, isValid, isEmpty, isObject };
