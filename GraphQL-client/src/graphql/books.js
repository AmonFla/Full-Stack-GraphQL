import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book{
    title
    author{
      name
      born
      id
    }
    published
    genres
    id
  }
`

export const BOOKS_GET_ALL = gql`
    query{
        allBooks{
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
 
export const BOOKS_ADD = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres){
          ...BookDetails
          }
    }
    ${BOOK_DETAILS}
` 
export const BOOKS_GET_BY_GENRE = gql`
    query getAllByGenre($genre: String!){
        allBooks(genre: $genre){
          ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const BOOK_ADDED_SUBSCRIPTION = gql`
    subscription{
      bookAdded{
        ...BookDetails
      }
    }
    ${BOOK_DETAILS}
`