import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import React, { createContext } from "react"
import config from './config/config'


const app = firebase.initializeApp(config)

const db = firebase.firestore()

const storage = firebase.storage()

export const FirebaseContext = createContext()

const FirebaseContextProvider = (props) => {
    return (
        <FirebaseContext.Provider value={{ app: app, db: db, storage: storage }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContextProvider