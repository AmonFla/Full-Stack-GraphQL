import {gql} from '@apollo/client'

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title,
            author,
            published
            genres
        }
    }
`
 
export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres){
              title
              author
              published
              genres
          }
    }
` 
/*`

  type Book{
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  }

  type Author{
    name: String!
    bookCount: Int!
    born: Int
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
`*/