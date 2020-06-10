const {db,dba} = require('../database');
const {uploader} = require('../helper/uploader')
const fs = require('fs')

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
        let sql = `
        select 
        a.address_id,a.city_id_rajaongkir,a.city_name,a.street_name,a.province_name,a.userId,u.username,u.name,u.phone 
            from address a
            join users u
            on a.userId=u.id 
            where userId=${userId}`
        try{
            let result = await dba(sql)
            res.status(200).send(result)
        }catch(err){
            console.log(err)
        }
    },
    addPayment : async (req,res) => {
        let {userId} = req.params
        let {shopDate,totalTagihan,donasi,totalOngkir,serviceFee,totalBelanja} = req.query
        console.log(shopDate,totalTagihan,donasi,totalOngkir,serviceFee,totalBelanja,userId)

        let sql = `
        INSERT INTO transaction (date,total_price,grand_total,userId,img_transaction,ongkir,donasi,service_fee) 
        values (${shopDate},${totalBelanja},${totalTagihan},${userId},'PATH',${totalOngkir},${donasi},${serviceFee});`
        try{
            await dba(sql)
            res.status(200).send({
                message: 'Add Payment success'
            })
        }catch(err){
            console.log(err)
        }


    },
    updatePaymentStatus: async (req,res) => {
        let {status,id} = req.params
        let sql= `UPDATE transaction set payment_status=${status} where id=${id}`
        try{
            await dba(sql)
        }catch(err){
            console.log(err)
        }
    },
    addImageTrans : async (req,res) => {
        try{
            const path = '/transImage'
            const upload = uploader(path,"TRI").fields([{name:'image'}])
            upload(req,res,(err)=>{
                if(err) res.status.send(err.message)
                const {image} = req.files
                const imagePath = image ? `${path}/${image[0].filename}` : null
                let sql = `update transaction set img_transaction='${imagePath}' where id=${req.params.id}`;
                db.query(sql, async (err,results)  => {
                    if(err){
                        fs.unlinkSync(`../public${imagePath}`)
                        res.status(500).send(err.message)
                    }
                    res.status(201).send({
                        status : 'created',
                        message : 'Data Created!',
                        image: imagePath
                    })
                    let status = `UPDATE transaction SET payment_status=2 where id=${req.params.id}`
                    await dba(status)
                })
            })

        }catch(err){

        }
    },
    getWaitingPayment: async (req,res)=>{
        let {userId,status} = req.params
        let sql = `select * from transaction where userId=${userId} AND payment_status=1;`
        try{
            let result = await dba(sql)
            res.status(200).send(result)
        }catch(err){
            console.log(err)
        }
    },
    invoicePayment : () => {
        
    },
    
}