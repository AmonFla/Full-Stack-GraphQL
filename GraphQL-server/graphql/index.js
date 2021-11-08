const { gql, UserInputError, AuthenticationError } = require('apollo-server-express')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDefs = gql`

  type Book{
    title: String!
    author: Author!
    published: Int
    genres: [String]!
    id: ID!
  }

  type Author{
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type User{
    username: String!
    favoriteGenre: String!
    id:ID!
  }

  type Token{
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription{
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return await Book.find().populate('author')
      }
      return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
    },
    allAuthors: async () => await Author.find(),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        author = new Author({ name: args.author })

        await author.save().catch((e) => {
          throw new UserInputError(e.message, { invalidArgs: args })
        })
      }
      const book = new Book({ ...args, author: author })

      await book.save().catch((e) => {
        throw new UserInputError(e.message, { invalidArgs: args })
      })

      pubsub.publish('bookAdded', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!author) { return null }

      return await Author.findByIdAndUpdate(author.id, { born: args.setBornTo }, { new: true })
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      await user.save().catch((e) => {
        throw new UserInputError(e.message, { invalidArgs: args })
      })
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'clave') {
        throw new UserInputError('Wrong Credentials')
      }
      const userToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id
      }
      return { value: jwt.sign(userToken, SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded')
    }
  }
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

module.exports = { typeDefs, resolvers, context }
