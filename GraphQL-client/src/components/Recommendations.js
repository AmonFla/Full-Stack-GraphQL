/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_GET_BY_GENRE } from '../graphql/books' 
import { USER_ME } from '../graphql/user'


const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const [favorite, setFavorite] = useState('')
  const [getAllBooks, result] = useLazyQuery(BOOKS_GET_BY_GENRE, {fetchPolicy: 'network-only'})
  const [me, meResult]  = useLazyQuery(USER_ME)
  
 
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    } 
  },[result])

  useEffect(()=>{
    if(meResult.data){
      setFavorite(meResult.data.me.favoriteGenre)
    } 
  },[meResult]) 

  useEffect(()=>{
    getAllBooks({variables:{genre: favorite}})
  },[props.show, favorite])

  useEffect(()=>{
    if(props.token)
      me()
  },[props.token])
  
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