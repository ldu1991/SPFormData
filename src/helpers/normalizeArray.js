import { isEmpty } from './isEmpty';

const normalizeArray = (arrDataForm, separator) => {
    const result = {};
    arrDataForm.forEach((item) => {
        if (!isEmpty(item.value)) {
            if (!result.hasOwnProperty(item.name)) {
                result[item.name] = item.value;
            } else {
                result[item.name] += separator + item.value;
            }
        }
    });

    return result;
};

export default normalizeArray;
