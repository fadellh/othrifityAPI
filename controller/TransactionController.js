const {db,dba} = require('../database');

module.exports = {
    getUserCart: async (req,res) => {
        const {userId} = req.params
        let sql = `
        select 
        c.productId,p.userId, u.username, a.street_name, a.city_name, a.city_id_rajaongkir, p.nama_product,p.harga,c.qty,p.image_product, p.condition, p.weight 
        from cart c
            join product p
            on p.id=c.productId
            join users u
            on p.userId=u.id
            join address a
            on u.id = a.userId
            where c.userId = ${userId}`
        try{
            let result = await dba(sql)
            res.status(200).send(result)
        }catch(err){
            console.log(err)
        }
    },
    getUserAddress : async (req,res) => {
        const { userId} = req.params
        let sql = `select * from address where userId=${userId}`
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
        
    },
    
}