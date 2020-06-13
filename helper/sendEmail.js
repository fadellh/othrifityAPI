const { transporter } = require('../helper/nodemailer');
const fs = require('fs')
const {createPDF} = require('../helper/pdfkit');

const sendInvoice = (param) => {
    
    let name= `${param.username}-${param.id}-${(param.total + Math.floor(Math.random() * 100))}` 
    createPDF(name,param.total)
    let email = 'fadellhcoba2@gmail.com'
    // let username = 'fadhy'
    // let {username,email} = invoice[0]
    let url = `http://localhost:5000/redirect`;
    let mailOption = {
        from: 'AdminLain oThrifty<othriftyp@gmail.com>',
        to: email,
        subject: 'Invoice Alert',
        html: ` 
                <p>Pembayaran anda akan segera diverifikasi</p>`,
                text:`Terimakasih ${param.username}`,
        attachments:[{
            filename:'invoice.pdf', path:`./public/invoice/${name}.pdf`
        }]
      };
      transporter.sendMail(mailOption, (err, mailInfo) => {
        // res.status(200).send({
        //     status: 'Success',
        //   data: email,
        //   message: 'Invoice Send',
        // });
    });
}
const sendAlert = (invoice) => {
    let {username,email} = invoice[0]
    let url = `http://localhost:5000/redirect`;
    let mailOption = {
        from: 'Admin oThrifty<othriftyp@gmail.com>',
        to: email,
        subject: 'Payment Alert',
        html: ` <img src="cid:logo">
                <p>Klick <a href="${url}">link pembayaran ini</a> untuk mengirim bukti pembayaran Anda</p>`,
        text:`Terimakasih ${username}, segera selesaikan pembayaran Anda`,
        attachments:[{
            filename:'logo.png', path:'./public/tes/notif.png', cid:'logo'
        }]
      };
      
      transporter.sendMail(mailOption, (err, mailInfo) => {
        res.status(200).send({
          status: 'Success',
          data: email,
          message: 'Add Payment success,Invoice Send',
        });
    });
}

module.exports ={
    sendInvoice,
    sendAlert
}