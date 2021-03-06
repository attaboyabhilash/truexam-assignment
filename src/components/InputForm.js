import React, { useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import useAuthListener from '../hooks/useAuthListener';
import { v4 as uuidv4 } from 'uuid' //uuidv4()
import { FirebaseContext } from '../contexts/FirebaseContext'
import { GlobalContext } from '../contexts/GlobalContext'
import { seedDatabase } from '../helper/seed'

function InputForm() {
    const fileRef = useRef()
    const { db, storage } = useContext(FirebaseContext)
    const { handleUpdate } = useContext(GlobalContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [success, setSuccess] = useState("")
    const { user } = useAuthListener()
    const history = useHistory()

    const reference =  db.collection('tasks')
    

    const handleImage = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        if(image !== null){
            setDisabled(true)
            const storeRef = storage.ref(`images/${image.name}`).put(image)
            storeRef.on(
                "state changed",
                snapshot => {},
                err => {
                    console.error(err)
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setImageUrl(url)
                            setSuccess("Image uploaded successfully !!!")
                            setDisabled(false)
                        })
                }
            )
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTask = {
            id: uuidv4(),
            taskTitle: title,
            taskDesc: description,
            image: imageUrl,
            createdAt: Date.now(),
            createdBy: user.displayName
        }

        if(newTask.image !== ""){
            await reference
                .doc(newTask.id)
                .set(newTask)
                .catch(err => console.error(err))
        }

        const para = {
            id: newTask.id,
            db: db, 
            imageUrl: imageUrl, 
            title: title
        }
        
        setTitle("")
        setDescription("")
        setImage("")
        setImageUrl("")
        setSuccess("")
        handleUpdate()
        fileRef.current.value = ""
        seedDatabase(para)
        history.push("/dashboard")
    }


    return (
        <form onSubmit={handleSubmit} className="input-form">
            <input type="text" value={title} placeholder="Task Title" onChange={e => setTitle(e.target.value)} required/>
            <textarea value={description} placeholder="Task Description" onChange={e => setDescription(e.target.value)} />
            <div className="button-wrap">
                <label className="new-button" htmlFor="upload">Choose File</label>
                <input id="upload" ref={fileRef} type="file" onChange={handleImage} required/>
                <label className="handle-upload" onClick={handleUpload}>Upload Image</label>
                <p>*Please upload the Image before Submitting the Task.</p>
                <p className="success-message">{success && success}</p>
            </div>
            <input type="submit" disabled={disabled} value="Submit Task"  />
        </form>
    )
}

export default InputForm
