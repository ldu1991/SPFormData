import { isEmpty } from './utils';

const serializeArray = (formElement) => {
    const formData = new FormData(formElement);
    const pairs = [];
    formData.forEach((value, name) => {
        if (!isEmpty(value) && formElement.querySelector(`[name="${name}"]`).type !== 'file') {
            pairs.push({ name, value });
        }
    });
    return pairs;
};

export default serializeArray;
