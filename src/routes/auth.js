
const {Router} = require('express')
const passport = require('passport')
const Auth = require('../services/auth')

function auth(app){
    const router = Router()
    const authServ = new Auth()

    app.use('/api/auth', router)

    router.post('/login', async (req, res)=>{
        const details = await authServ.login(req.body)

        if(details.logged){
            const now = new Date().getDate()
            const expires = new Date(new Date().setDate(now+7))
            return res.cookie("token",details.token,{
                httpOnly: true,
                sameSite: "none",
                secure: true,
                expires

            }).json(details)
        }
       
        return res.status(403).json(details)
    })

    router.post("/logout", (req, res)=>{
        const details = {
            loggedOuth: true
        }

        return res.cookie("token", "",{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            expires: new Date()
        }).json(details)
    })


    router.post('/validate', async (req, res)=>{
        
        if(req.cookies.token){
            const details = await authServ.verify(req.cookies.token)
            if(details.role ==="ADMIN"){
                return res.json({allowe:true})
            }
        }

        
            return res.status(403).json({alowed:false })
    })

    router.get("google", passport.authenticate("google", {
        scope:['email', 'profile']
    }))


    router.get("/google/callback", (req, res)=>{
        return passport.authenticate("google", async (data)=>{
            const details = await authServ.google(data.profile)
            return res.cookie("token", details.token,{
                httpOnly:true,
                sameSite: "none",
                secure:true
            }).redirect("http://localhost:3000")
        })(req, res)
    })

}
module.exports = auth