import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
    const [update, setUpdate] = useState(false)

    const handleUpdate = () => {
        setUpdate(prevUpdate => !prevUpdate)
    }

    return (
        <GlobalContext.Provider value={{update, handleUpdate}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
