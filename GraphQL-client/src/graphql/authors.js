import {gql} from "@apollo/client"

export const AUTHORS_GET_ALL = gql`
    query{
        allAuthors{
            name
            bookCount
            born
            id
        }
    }
`  

export const AUTHOR_SET_BORN = gql`
    mutation modifyAuthorBorn($name: String!, $born: Int!) {
      editAuthor(name: $name, setBornTo: $born){
            name
            born
            bookCount 
            id
        }
    }
`

/*`

 
  
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