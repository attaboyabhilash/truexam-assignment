import React, { useState, useContext } from 'react'
import useAuthListener from '../hooks/useAuthListener';
import { v4 as uuidv4 } from 'uuid' //uuidv4()
import { FirebaseContext } from '../contexts/FirebaseContext'

function InputForm() {
    const { db, storage } = useContext(FirebaseContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const { user } = useAuthListener()

    const reference =  db.collection('tasks')

    const handleImage = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
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
                    })
            }
        )
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

        await reference
                .doc(newTask.id)
                .set(newTask)
                .catch(err => console.error(err))
        
        setTitle("")
        setDescription("")
        setImage("")
        setImageUrl("")
    }


    return (
        <form onSubmit={handleSubmit} className="input-form">
            <input type="text" value={title} placeholder="Task Title" onChange={e => setTitle(e.target.value)} required/>
            <textarea value={description} placeholder="Task Description" onChange={e => setDescription(e.target.value)} />
            <div className="button-wrap">
                <label className="new-button" htmlFor="upload">Choose File</label>
                <input id="upload" type="file" onChange={handleImage} required/>
                <label className="handle-upload" onClick={handleUpload}>Upload Image</label>
                <p>Please upload the Image before Submitting the Task.</p>
            </div>
            <input type="submit" value="Submit Task" />
        </form>
    )
}

export default InputForm
