const { gql, UserInputError } = require('apollo-server')
const Book = require('../models/book')
const Author = require('../models/author')

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
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!,
    allAuthors: [Author!]!
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
    allAuthors: async () => await Author.find()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
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
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) { return null }

      return await Author.findByIdAndUpdate(author.id, { born: args.setBornTo }, { new: true })
    }
  }
}
module.exports = { typeDefs, resolvers }
