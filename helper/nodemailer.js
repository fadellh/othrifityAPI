const nodemailer = require('nodemailer');
const util = require('util')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'othriftyp@gmail.com',
        pass:'pgtvisvzvmxfnkbr'
    },
    tls:{
        rejectUnauthorized:false
    }
})

const transporterAwait = util.promisify(transporter.sendMail).bind(transporter)
module.exports = {
    transporter,
    transporterAwait
};