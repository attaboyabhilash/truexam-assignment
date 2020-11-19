import React, { useState, useEffect, useContext } from 'react'
import { MdDelete } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext'

function OutputTaskSlide({ task }) {
    const { id, taskTitle } = task
    const { db } = useContext(FirebaseContext)
    const history = useHistory()
    const [studentTasksIDs, setStudentTasksIDs] = useState([])

    const reference = db.collection('studentTasks').where("id", "==", id)

    const getTasks = () => {
        reference.onSnapshot(snapshot => {
            const data = []
            snapshot.forEach(doc => {
                data.push(doc.id)
            })
            setStudentTasksIDs(data)
        })
    }

    useEffect(() => {
        getTasks()
    },// eslint-disable-next-line
    [])

    const handleDelete = (id) => {
        db.collection('tasks')
            .doc(id)
            .delete()
            .catch(err => console.error(err))

        studentTasksIDs.forEach(ids => {
            return (
                db.collection('studentTasks')
                    .doc(ids)
                    .delete()
                    .then(() => {
                        history.push('/dashboard')
                    })
                    .catch(err => console.error(err))
                )
        })
        
    }


    return (
        <div className="task">
            <p>{taskTitle}</p>
            <MdDelete className="delete" onClick={() => handleDelete(id)}/>
        </div>
    )
}

export default OutputTaskSlide
