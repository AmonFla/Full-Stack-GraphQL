import {gql} from '@apollo/client'

export const USER_LOGIN = gql`
    mutation userLogin($username: String!, $password: String!) {
      login(username: $username, password: $password){
            value
        }
    }
`

export const USER_ME = gql`
    query{
        me{
            username
            favoriteGenre
        }
    }
`