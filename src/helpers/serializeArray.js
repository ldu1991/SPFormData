const serializeArray = (formElement) => {
    const formData = new FormData(formElement);
    const pairs = [];
    formData.forEach((value, name) => {
        pairs.push({ name, value });
    });
    return pairs;
};

export default serializeArray;
