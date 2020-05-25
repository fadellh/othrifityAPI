const {db,dba} = require('../database');

module.exports = {
    getAllUser : async (req,res) => {
        let {sort, filterBy1,filterBy2, filterParam2, orderBy,filterParam1,search} = req.query

        let sql = `select us.status_name as status, u.id, u.username, u.email , u.address, sum(t.total_price) as revenue_toko, u.join_date, count(t.userId) as total_sale 
        from users u 
        Join transaction t
        on u.id=t.userId
        join userstatus us
        on u.statusId=us.id_status`
        
        if(!orderBy&!filterBy1&!search&!filterBy2){
            sql += ` group by t.userId`
        }
        if(filterBy1){
            sql += ` where ${filterBy1} = ${filterParam1}`
        }
        // if(filterBy2){
        //     sql += ` AND ${filterBy2} = ${filterParam2}`}
        if(search){
            {filterBy1?sql+=` AND u.username LIKE '${search}%'`:sql += ` where u.username LIKE '${search}%'`}
        }
        
        if(filterBy1||filterBy2||orderBy||search){
            sql += ` group by t.userId`
        }
        
        if(orderBy){
            sql += ` order by ${orderBy} ${sort}` 
        }

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

