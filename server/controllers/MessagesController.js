const messageModel = require("../model/messageModel")

module.exports.addMsg=async (req,res,next)=>{
try {
    const {from,to,message}=req.body
    const data=await messageModel.create({
        message:{text:message,},
        users:[from,to],
        sender:from
    })
    if(data){
        return res.json({status:201 })
    }
    else
    return res.json({status:400, msg:"failed to send the message" })

} catch (error) {
    next(error)
}
}
module.exports.getAllMsg=async (req,res,next)=>{
try {
    const data=messageModel.find()
    return res.json({status:200,data})
} catch (error) {
    next(error)
}
}