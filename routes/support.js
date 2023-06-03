const User = require("../services/support")
const router =require("express").Router()
const user = new User()
router.post("/login", async (req, res)=>{
    let Login = await user.login(req.body)
    res.json(Login)

})
router.post("/createAccount", async (req, res)=>{
    let acc = await user.createAccount(req.body)
    res.json(acc)

})
router.post("/UserSearch", async (req, res)=>{
    let acc = await user.UserSearch(req.body)
    res.json(acc)

})



module.exports = router
