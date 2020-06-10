const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const port = 2000

app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('public'))


app.get('/', (req,res)=>{
    res.status(200).send('<h1>Welcome To API </h1>')
})

const {
    manageUserRouter,
    transactionRouter
}= require('./router')

app.use('/manage-user',manageUserRouter)
app.use('/transaction',transactionRouter)

app.listen(port, ()=> console.log(`API active at port ${port}`))


