
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {    
    setToken(null)    
    localStorage.clear()  
  }

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
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App