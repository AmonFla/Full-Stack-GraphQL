const { gql } = require('apollo-server')
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
    allBooks: [Book!]!,
    allAuthors: [Author!]!
  }
  
  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async () => await Book.find().populate('author'),
    allAuthors: async () => await Author.find()
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      await book.save()
      return book
    }
  }
}
module.exports = { typeDefs, resolvers }

/*
const typeDefs = gql`

  type Book{
    title: String!
    author: Author!
    published: Int!
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
    allBooks(author: String, genre: String): [Book!]!,
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
` */
