const {Router} = require('express')
const User = require('../services/user')

function users(app){
    const router = Router()
    const userServ = new User()

    app.use('/api/users',router)

    router.get("/", async (req, res)=>{
        //console.log(req)
        const users =  await userServ.getAll()
 
        return res.json(users)
     })

     router.get('/:email', async (req, res)=>{
        const email = req.params.email

        const user = await userServ.get(email)
        return res.json(user)
   })

   router.post('/', async (req, res)=>{
      console.log(req.body)
      const data = req.body
      const user = await userServ.create(data)

      return res.json(user)
     
   })

   router.put("/:id", async (req, res)=>{
      const user = await userServ.update({id:req.params.id, user: req.body})

      return res.json(user)
   })

}

module.exports = users