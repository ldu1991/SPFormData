import { isEmpty } from './isEmpty';

const normalizeArray = (arrDataForm) => {
    const result = {};
    arrDataForm.forEach((item) => {
        if (!isEmpty(item.value)) {
            if (!result.hasOwnProperty(item.name)) {
                result[item.name] = item.value.replace(/ /g, '+');
            } else {
                result[item.name] += `,${item.value.replace(/ /g, '+')}`;
            }
        }
    });

    return result;
};

export default normalizeArray;
