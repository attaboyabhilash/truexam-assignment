import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { MdDelete } from 'react-icons/md'

function OutputTasks({name}) {
    const { db } = useContext(FirebaseContext)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    const reference =  db.collection('tasks').where("createdBy", "==", `${name}`).orderBy('createdAt')

    const getTasks = () => {
        setLoading(true)
        reference.onSnapshot(snapshot => {
            const data = []
            snapshot.forEach(doc => {
                data.push(doc.data())
            })
            setTasks(data)
            setLoading(false)
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
    }


    return (
        <div className="output-tasks">
            {loading === true ? 
                <div className="task">
                    <p>Loading...</p>
                    <span className="dummy-image"></span>
                </div>
                :
                tasks && tasks.map(task => {
                    return(
                        <div key={task.id} className="task">
                            <p>{task.taskTitle}</p>
                            <MdDelete className="delete" onClick={() => handleDelete(task.id)}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OutputTasks
