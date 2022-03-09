const {buildSchema, GraphQLError, GraphQLSchema} = require('graphql')
const Propiedad = require('../services/propiedad')
const Users = require('../services/user')

const userServ = new Users()
const propiedadService = new Propiedad()

const root={
    hello:()=>{
        return 'Hola Mundo'
    },
    createPropiedad:propiedadService.create,
    propiedades: propiedadService.getAll,
    createUser: userServ.create,
    users: userServ.getAll,
    updateUser: userServ.update,
    updatePropiedad: propiedadService.update,
    propiedadonly:propiedadService.get,
    propiedadesBusqueda:propiedadService.getCategoria

}

const schemas = buildSchema(


    `
    input PropiedadInput{
        ubicacion:[String],
        tamano: String,
        numeroHabitaciones:Int
        banos: Int,
        fotografias: [String],
        descripcion: String
        parqueo: Int
        precio: Float
    }

    input precioInput{
        valor1:Float,
        valor2:Float
    }

    input UserInput{
        role: String
        name: String
        email: String
        password: String
    }

    type User{
        name: String
        email: String
        role: String
        id: String
    }
    


    type Query{
        hello: String,
        propiedades: [Propiedad]
        users: [User]
        propiedadonly(id:String, name:String, ubicacion:String): Propiedad
        propiedadesBusqueda(ubicacion:[String], precio:precioInput, parqueo:Int, numeroHabitaciones:Int):[Propiedad]
    }

    type Propiedad {
        ubicacion:[String],
        tamano: String,
        numeroHabitaciones:Int,
        banos: Int,
        fotografias: [String],
        descripcion: String
        parqueo: Int
        precio: Float
        id: String
    }

    type Mutation{
        createPropiedad(Propiedad:PropiedadInput ): Propiedad
        createUser(User:UserInput):User
        updateUser(id:String!, user:UserInput):User
        updatePropiedad(id:String!,Propiedad:PropiedadInput ): Propiedad
    }
    `
)

module.exports ={root, schemas}