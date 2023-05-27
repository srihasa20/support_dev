const User = require("../service/support")
const router =require("express").Router()
const user = new User()
router.post("/login", async (req, res)=>{
    let Login = await user.login(req.body)
    res.json(Login)

})

module.exports = router
