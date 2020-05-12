const {db,dba} = require('../database');

module.exports = {
    getAllUser : async (req,res) => {
        let sql = `select us.status_name as status, u.id, u.username, u.email , u.address, sum(t.total_price) as revenue_toko, u.join_date, count(t.userId) as total_sale 
        from users u 
        Join transaction t
        on u.id=t.userId
        join userstatus us
        on u.statusId=us.id_status
        group by t.userId
        limit 10;`
        try{ 
            let result = await dba(sql)
            // console.log(result)
            res.status(200).send(result)
        }
        catch(err){
            res.status(400).send(err.message)
        }
    },
    deleteUser : async (req,res) => {
        let {id}= req.params
        let sql = `delete from users where id=${id}`
        try{
            await dba(sql)
            res.status(200).send({
                message: 'Data deleted'
            })
        }catch(err){
            console.log(err)
        }
    },
    userStatus : async (req,res) => {
        let {status, userId} = req.params
        let sql =`update users set statusId=${status} where id=${userId}`
        try{
            await dba(sql)
            res.status(200).send({
                message: 'Update Success'
            })
        }catch(err){}
    }
}

