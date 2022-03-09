const {Router} = require('express');
const Propiedad = require('../services/propiedad')

function propiedad(app){
        const router = Router()
        const propiedadService = new Propiedad()

        app.use('/api/propiedad',router)

        router.get("/", async (req, res)=>{
            const propiedad =  await propiedadService.getAll()
     
            return res.json(propiedad)
         })
     
         router.get('/:id', async (req, res)=>{
              const id = req.params.id
     
              const propiedad = await propiedadService.get(id)
              return res.json(propiedad)
         })
     
         router.post('/', async (req, res)=>{
            const data = req.body
            const propiedad = await propiedadService.create(data)
     
            return res.json(propiedad)
           
         })

         router.post('/update/:id', async (req, res)=>{
             const id = req.params.id
            const Propiedad = req.body
            const query= { id, Propiedad}
            const propiedad = await propiedadService.update(query)
     
            return res.json(propiedad)
           
         })


         router.delete('/:id', async (req, res)=>{
             const id = req.params.id

             const propiedad = await propiedadService.delete(id)

             return(propiedad)
         })
}

module.exports = propiedad