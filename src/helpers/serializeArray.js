import { isEmpty } from './utils';

const serializeArray = (formElement) => {
    const formData = new FormData(formElement);
    const pairs = [];
    formData.forEach((value, name) => {
        if (!isEmpty(value)) {
            pairs.push({ name, value });
        } else if (formElement.querySelector(`[name="${name}"]`).type === 'file' && value.size > 0 && value.name !== '') {
            pairs.push({ name, value });
        }
    });

    return pairs;
};

export default serializeArray;
