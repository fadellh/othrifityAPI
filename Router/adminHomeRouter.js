const express = require('express');
const router = express.Router()
const {} = require('../controller')
// const {auth} = require('../helper/jwt')
const {
    
}= adminHomeController

router.get('/getAllUsers', getAllUser)


module.exports = router