export const isEmpty = (value) => {
    return !value || !/[^\s]+/.test(value);
};

export const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
