const getDate = str => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(str)
    return `${monthNames[date.getMonth()]} ${date.getDate()}`
}

export {
    getDate
}