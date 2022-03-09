const PropiedadModel = require('../models/propiedad')

class Propiedad {

    async get(query){
        //console.log("Aqui esta la cuerry")
        //console.log(query.id)
        const queya= query.id
        const propiedad= await PropiedadModel.findById(queya)
                            
        //console.log(propiedad, "El resultado")
        return propiedad
    }

    async getAll(query){


        return await PropiedadModel.find(query)
    }

    async getCategoria(query){
        console.log(query)

        if(query.precio && !query.numeroHabitaciones && !query.ubicacion){
            const valor1=query.precio.valor1
            const valor2=query.precio.valor2
            query={
               
                $and: [{ precio: {$lte : valor2 }},{ precio: { $gte: valor1}}]
               
            }
            console.log(query.precio)
           // return await PropiedadModel.find(query.precio)
        }
       
        if(query.ubicacion&& !query.precio && !query.numeroHabitaciones){
            query.ubicacion={
                $all:query.ubicacion
            }
        }

        if(query.numeroHabitaciones && !query.ubicacion&& !query.precio ){
            query.numeroHabitaciones={
                $all:query.numeroHabitaciones
            }
        }
        

        if(query.precio && query.ubicacion && query.numeroHabitaciones){
            const valor1=query.precio.valor1
            const valor2=query.precio.valor2
            console.log("Esytoy justo quei que pasara")
            query={
                $and:[
                    { precio: {$lte : valor2 }},{ precio: { $gte: valor1}},
                    {ubicacion:{$in:[query.ubicacion ] }},
                    { numeroHabitaciones:{$in:[query.numeroHabitaciones]}}
                ]
            }
            
            return await PropiedadModel.find({query})
        }
        console.log("querir rieasfkdlj")
        console.log(query)

        const  a= await PropiedadModel.find(query)
        //console.log(a)

        return a
    }

    async create(query){
        //console.log("ESTE ES EL QUERY ",query.Propiedad)
        return await PropiedadModel.create(query.Propiedad)
    }

    async update(query){
      //  console.log("AQUI ESTA EL QUETY")
        console.log()
        console.log(query.Propiedad)
        return await PropiedadModel.findByIdAndUpdate(query.id, query.Propiedad, {new:true})
    }

    async delete(query){
        console.log(query)
        const eliminado = await PropiedadModel.findByIdAndDelete(query)
        
        return {succes:true}

    }

}

module.exports = Propiedad