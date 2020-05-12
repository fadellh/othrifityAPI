const mysql = require('mysql')
const util = require('util')

const {MongoClient, ObjectID} = require('mongodb')
let url = 'mongodb+srv://lian:asd123@dbjc11-gitmg.mongodb.net/test?retryWrites=true&w=majority'


const db = mysql.createConnection({
    host: 'localhost',
    user: 'fadellh',
    password: 'mysql',
    database: 'othrifty',
    port: 3306
});
// const db = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'fadellh',
//     password: 'db4free0bisa0',
//     database: 'todolistfadel',
//     port: 3306
// });

const dba = util.promisify(db.query).bind(db)

module.exports = {
    db,
    dba,
    mongo: {
        MongoClient,
        ObjectID,
        url
    }
}
;