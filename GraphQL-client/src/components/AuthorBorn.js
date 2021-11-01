import React, { useEffect, useState } from "react"
import { AUTHOR_SET_BORN } from "../graphql/authors"
import { useMutation } from "@apollo/client"
import { resultKeyNameFromField } from "@apollo/client/utilities"

const AuthorBorn = ()=>{
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [modifyAuthorBorn] = useMutation(AUTHOR_SET_BORN)

    const submit = async(e)=> {
        e.preventDefault()
        modifyAuthorBorn({variables:{name, born: Number(born)}})

        setName('')
        setBorn('')
    }

  
    return(
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit} >
                <div>
                    name <input value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    born <input value={born} onChange={(e)=>setBorn(e.target.value)} />
                </div>
                <div>
                    <button type="submit">updateUser</button>
                </div>
            </form>
        </div>
    )
}

export default AuthorBorn