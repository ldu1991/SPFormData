const normalizeArray = (arrDataForm, separator) => {
    const result = {};
    arrDataForm.forEach((item) => {
        if (!result.hasOwnProperty(item.name)) {
            result[item.name] = encodeURIComponent(item.value.replace(/ /g, '+'));
        } else {
            result[item.name] += separator + encodeURIComponent(item.value.replace(/ /g, '+'));
        }
    });

    return result;
};

export default normalizeArray;
