import React, { useState, useEffect } from "react"
import { LOGIN } from "../graphql/login"
import { useMutation } from "@apollo/client"  

const LoginForm = ({setToken, show, setPage})=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [userLogin, result] = useMutation(LOGIN)

    const submit = async(e)=> {
        e.preventDefault()
        userLogin({variables:{username, password}})

        setUsername('')
        setPassword('')
    }

  
    useEffect(()=>{
      if(result.data){
        const token = result.data.login.value;
        if(token){
          setToken(token)
          localStorage.setItem('user-token', token)
          setPage()
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result.data])

    if (!show) {
      return null
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={submit} > 
            <div>
                    username <input value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div>
                    password <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
