import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext'
import StudentTasks from './StudentTasks'

function RightDashboard() {
    const { id } = useParams()
    const { db } = useContext(FirebaseContext)
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(false)

    const reference =  db.collection('tasks')

    const getTasks = () => {
        setLoading(true)
        reference.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if(doc.id === id){
                    setTask(doc.data())
                }
            })
            setLoading(false)
        })
    }

    useEffect(() => {
        getTasks()
    },// eslint-disable-next-line
    [id])

    const date = new Date(task.createdAt)
    const stringDate = date.toDateString()

    return (
        <div className="task-dashboard">
            {loading ? 
                <h3>Loading...</h3> 
                : 
                <div className="task-details">
                    <div className="task-details-card">
                        <h3>Task Title: {task.taskTitle}</h3>
                        <small>{stringDate}</small>
                        <p>Task Description: {task.taskDesc}</p>
                        <img src={task.image} alt={task.taskTitle}/>
                    </div>
                    <StudentTasks id={id}/> 
                </div>
            }
        </div>
    )
}

export default RightDashboard
