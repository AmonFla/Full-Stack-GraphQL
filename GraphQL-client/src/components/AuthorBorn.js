import React, { useState } from "react"
import { AUTHOR_SET_BORN } from "../graphql/authors"
import { useMutation } from "@apollo/client"
import Select from 'react-select'

const AuthorBorn = ({authors})=>{
    const [optionSelect, setOptionSelect] = useState(null)
    const [born, setBorn] = useState('')

    const [modifyAuthorBorn] = useMutation(AUTHOR_SET_BORN)

    const submit = async(e)=> {
        e.preventDefault()
        modifyAuthorBorn({variables:{name: optionSelect.value, born: Number(born)}})

        setOptionSelect('')
        setBorn('')
    }

  
    return(
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit} >
                <div>
                    name <Select 
                        defaultValue={optionSelect}
                        onChange={setOptionSelect}
                        options={authors.map( a => {
                            return({'value':a.name, 'label':a.name})
                        } )}
                    />

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