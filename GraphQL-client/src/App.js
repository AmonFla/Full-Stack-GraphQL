
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useSubscription, useApolloClient} from '@apollo/client'
import { BOOKS_GET_ALL, BOOK_ADDED_SUBSCRIPTION } from './graphql/books'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {    
    setToken(null)    
    localStorage.clear()  
  }

  const updateCache = (book) => {
    const includeIn = (set, object) => 
      set.map(p=>p.id).includes(object.id)

    const dataInStore = client.readQuery({query: BOOKS_GET_ALL})
    if(!includeIn(dataInStore.allBooks, book)){
      client.writeQuery({
        query: BOOKS_GET_ALL,
        data: {allBooks: dataInStore.allBooks.concat(book)}
      })
    }
  }

  useSubscription(BOOK_ADDED_SUBSCRIPTION,{
    onSubscriptionData: ({subscriptionData}) => {
      const book = subscriptionData.data.bookAdded
      window.alert('New book was added')
      updateCache(book)
    }
  })

  useEffect(()=>{
    const userToken = localStorage.getItem('user-token')
    if (userToken){
      setToken(userToken) 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token 
            ? <button onClick={()=>setPage('login')} >Login</button>
            : <><button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommendations</button>
              <button onClick={()=>logout() }>Logout</button></>
              }
        
      </div>

      <LoginForm
        show={page==='login'}
        setToken={()=>setToken()}
        setPage={()=>setPage('authors')}
      />

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}
        token={token}
      />

      <NewBook
        show={page === 'add'}
        setPage={()=>setPage('books')}
      />

    </div>
  )
}

export default App