import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import React, { createContext } from "react"
import config from './config/config'


const app = firebase.initializeApp(config)

const db = firebase.firestore()

export const FirebaseContext = createContext()

const FirebaseContextProvider = (props) => {
    return (
        <FirebaseContext.Provider value={{ app: app, db: db }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContextProvider