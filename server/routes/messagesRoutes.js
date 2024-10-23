const {addMsg,getAllMsg}=require('../controllers/MessagesController')

const router=require('express').Router()

router.post('/add-msg',addMsg)
router.post('/get-all-messages',getAllMsg)

module.exports=router

