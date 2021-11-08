import { useQuery ,useLazyQuery} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_GET_BY_GENRE } from '../graphql/books' 
import { USER_ME } from '../graphql/user'


const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const [favorite, setFavorite] = useState('')
  const [getAllBooks, result] = useLazyQuery(BOOKS_GET_BY_GENRE)
  const me = useQuery(USER_ME)
  
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[result])

  useEffect(()=>{
    if(me.data){
      setFavorite(me.data.me.favoriteGenre)
      getAllBooks({variables:{genre: me.data.me.favoriteGenre}})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[me]) 

  if (!props.show) {
    return null
  }
 
  
  

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favorite}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations