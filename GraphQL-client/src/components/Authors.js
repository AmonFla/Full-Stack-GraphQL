import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { AUTHORS_GET_ALL } from '../graphql/authors'
import AuthorBorn from './AuthorBorn'

const Authors = (props) => {
  const result = useQuery(AUTHORS_GET_ALL)
  const [authors, setAuthors] = useState([])

  useEffect(()=>{
    if(result.data){
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show) {
    return null
  }
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token
        ?<AuthorBorn authors={authors}/>
        :null
      }
    </div>
  )
}

export default Authors
