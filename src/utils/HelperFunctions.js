
/**
 * @param {*} str Date of string
 * @returns Month and Date from string
 */
function getDate(str) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(str)
    return `${monthNames[date.getMonth()]} ${date.getDate()}`
}

/**
 * Function that will return initials of name
 * @param {*} name Name that will be initialized
 * @returns first two intials (if applicable) of username
 */
function getUserInitials(name) {
    return name.split(' ').map((e, i, a) => (i == 0 ) ? e[0].toUpperCase() : (i+1 == a.length && i != 0) ? e[0].toUpperCase() : '').join('')
}

export {
    getDate,
    getUserInitials
}