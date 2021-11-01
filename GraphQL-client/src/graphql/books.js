import {gql} from '@apollo/client'

export const BOOKS_GET_ALL = gql`
    query{
        allBooks{
            title,
            author,
            published
            genres
            id
        }
    }
`
 
export const BOOKS_ADD = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres){
              title
              author
              published
              genres
              id
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