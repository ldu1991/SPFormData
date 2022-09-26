import { isEmpty } from './isEmpty';

const normalizeArray = (arrDataForm, separator, changeGetUrl) => {
    const result = {};
    arrDataForm.forEach((item) => {
        if (!isEmpty(item.value)) {
            if (!result.hasOwnProperty(item.name)) {
                result[item.name] = changeGetUrl ? item.value.replace(/ /g, '+') : item.value;
            } else {
                result[item.name] += changeGetUrl ? separator + item.value.replace(/ /g, '+') : separator + item.value;
            }
        }
    });

    return result;
};

export default normalizeArray;
