import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_GET_ALL } from '../graphql/books'
import { union, includes } from 'lodash'


const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(BOOKS_GET_ALL)
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
      setGenres(result.data.allBooks.reduce((genres, book) => union(genres,book.genres), [])) 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[result])

  if (!props.show) {
    return null
  }

  let bookList = books
  if(filter !== '')
    bookList = books.filter(b => includes(b.genres, filter) )
  
  

  return (
    <div>
      <h2>books</h2>

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
          {bookList.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre=> <button onClick={()=> setFilter(genre)}>{genre}</button> )}<button onClick={()=> setFilter('')}>Todos</button>
    </div>
  )
}

export default Books