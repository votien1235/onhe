// export function md5(string) {
//     return CryptoJS.MD5(string).toString();
// }

export function validateInputWrapper(inputWrapper, condition, message) {
    let value = inputWrapper.value;

    if (condition(value)) {
        inputWrapper.error = "";
        return true;
    }
    inputWrapper.error = message;
    return false;
}


export function getDataFromDoc(doc, excepts = []) {
    let data = doc.data();
    data.id = doc.id;
    for (let except of excepts) {
        delete data[except];
    }
    return data;
}

export function saveCurrentUser(userData) {
    localStorage.setItem('current-user', JSON.stringify(userData));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current-user'));
}