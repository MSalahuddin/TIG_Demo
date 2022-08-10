export const removeValueFromArray = (array = [], value) => {
    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1)
    }

    return array;
};

export const removeObjectFromArray = (array = [], value, key = "id") => {
    const index = array.findIndex(item => item?.[key] === value)
    if (index !== undefined) {
        array[index].delete;
    };

    return array
}