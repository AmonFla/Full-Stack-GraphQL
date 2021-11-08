
const { ApolloServer } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')

const { typeDefs, resolvers, context } = require('./graphql')
const config = require('./utils/config')

console.log('Conectando a Mongo')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conectado al Mongo')
  })
  .catch((error) => {
    console.log('Error de mongo', error.message)
  })

async function startApolloServer (typeDefs, resolvers, context) {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionsServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: '/'
  })

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context,
    plugins: [{
      async serverWillStart () {
        return {
          async drainServer () {
            subscriptionsServer.close()
          }
        }
      }
    }]
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  })

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers, context)
