const {db,dba} = require('../database');

module.exports = {
    getUserCart: async (req,res) => {
        let sql = `select c.userId ,username,address,phone, p.nama_product,p.condition,p.sizeId,p.harga,c.qty from users u
        join cart c
        on u.id=c.userId
        join product p
        on p.id=c.productId`
        try{
            let result = await dba(sql)
            res.status(200).send(result)
        }catch(err){
            console.log(err)
        }
    },
    addPayment : async (req,res) => {
        let sql = ``
    },
    updatePaymentStatus: async (req,res) => {
        let {status,id} = req.params
        let sql= `UPDATE transaction set payment_status=${status} where id=${id}`
    },
    invoicePayment : () => {
        
    }
}