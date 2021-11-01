
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const { typeDefs, resolvers } = require('./graphql')
const config = require('./utils/config')

console.log('Conectando a Mongo')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conectado al Mongo')
  })
  .catch((error) => {
    console.log('Error de mongo', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
