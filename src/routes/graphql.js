const {graphqlHTTP} = require('express-graphql')
const {root, schemas} = require('../libs/graphql')


function graphql(app){

    app.use('/graphql', graphqlHTTP((request, response, paramas)=>{
            //console.log(paramas)

        return({
            graphiql: true,
            rootValue: root,
            schema: schemas,
        })
    }))
}

module.exports = graphql