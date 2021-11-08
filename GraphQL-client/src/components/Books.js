import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_GET_ALL } from '../graphql/books'


const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(BOOKS_GET_ALL)
  console.log(result)
  
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    }
  },[result])

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
    </div>
  )
}

export default Books