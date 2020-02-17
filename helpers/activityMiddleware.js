const {Active} = require('../models/index.js')
module.exports = async (req,res,next)=>{
try{
var date = new Date()
date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
if(!(await Active.findOne({day : date, user : req.user._id,community: req.community._id}))){
    await Active.create({day : date, user : req.user._id,community: req.community._id})
}
next()
}catch(err){
    next()
    console.log(err)
}
}