module.exports.str_gen = (len) => {
    const chrs = 'abcdehklmnopqrstuwxzABCDEFGHKMNPQRSTWXZ1234567890'
    let str = ''
    for (let i = 0; i < len; i++) {
        let pos = Math.floor(Math.random() * chrs.length)
        str += chrs.substring(pos, pos+1)
    }
    return str
}