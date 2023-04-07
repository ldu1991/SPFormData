const normalizeArray = (arrDataForm, separator) => {
    const result = {};
    arrDataForm.forEach((item) => {
        if (!result.hasOwnProperty(item.name)) {
            result[item.name] = encodeURIComponent(item.value);
        } else {
            result[item.name] += separator + encodeURIComponent(item.value);
        }
    });

    return result;
};

export default normalizeArray;
