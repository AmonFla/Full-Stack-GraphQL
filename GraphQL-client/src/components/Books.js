/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_GET_ALL, BOOKS_GET_BY_GENRE } from '../graphql/books'
import { union} from 'lodash'


const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getAllBooks, resultFull] = useLazyQuery(BOOKS_GET_ALL) 
  const [getAllBooksFiltered, resultFiltered] = useLazyQuery(BOOKS_GET_BY_GENRE, {fetchPolicy: 'network-only'})

  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  
  useEffect(()=>{
    if(resultFull.data){
      setBooks(resultFull.data.allBooks)
      setGenres(resultFull.data.allBooks.reduce((genres, book) => union(genres,book.genres), [])) 
    } 
  },[resultFull])

  useEffect(()=>{
    if(resultFiltered.data){
      setBooks(resultFiltered.data.allBooks) 
    } 
  },[resultFiltered])

  useEffect(()=>{
    getAllBooks()
  },[])

  useEffect(()=>{
    if(filter !== ''){
      getAllBooksFiltered({variables:{genre: filter}})
    }else{
      getAllBooks()
    }
  },[filter])

  if (!props.show) {
    return null
  }

  
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre=> <button key={genre} onClick={()=> setFilter(genre)}>{genre}</button> )}<button onClick={()=> setFilter('')}>Todos</button>
    </div>
  )
}

export default Books