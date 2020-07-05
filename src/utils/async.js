async function sleep(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000 * s);
    })
}

module.exports = { sleep }