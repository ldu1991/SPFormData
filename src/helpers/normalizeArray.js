const normalizeArray = (arrDataForm, separator, formElement) => {
    const result = {
        all_query: {},
        string_query: {}
    };
    arrDataForm.forEach((item) => {
        if (formElement.querySelector(`[name="${item.name}"]`).type === 'file') {
            if (!result.all_query.hasOwnProperty(item.name)) {
                result.all_query[item.name] = {
                    type: 'file',
                    elements: [item.value]
                };
            } else {
                result.all_query[item.name].elements.push(item.value);
            }
        } else if (!result.string_query.hasOwnProperty(item.name)) {
            result.all_query[item.name] = encodeURIComponent(item.value.replace(/ /g, '+'));
            result.string_query[item.name] = encodeURIComponent(item.value.replace(/ /g, '+'));
        } else {
            result.all_query[item.name] += separator + encodeURIComponent(item.value.replace(/ /g, '+'));
            result.string_query[item.name] += separator + encodeURIComponent(item.value.replace(/ /g, '+'));
        }
    });

    return result;
};

export default normalizeArray;
