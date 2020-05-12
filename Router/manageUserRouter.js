const express = require('express');
const router = express.Router()
const {manageUserController} = require('../controller')
// const {auth} = require('../helper/jwt')
const {
    getAllUser,
    deleteUser,
    userStatus
}= manageUserController

router.get('/getAllUsers', getAllUser)
router.delete('/delete-user/:id', deleteUser)
router.patch('/update-status/:status/:userId', userStatus)

module.exports = router