import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'

function StudentTasks({ id }) {
    const { db } = useContext(FirebaseContext)
    const [studentTasks, setStudentTasks] = useState([])
    const [loading, setLoading] = useState(false)

    const reference = db.collection('studentTasks').where("id", "==", id)

    const getTasks = () => {
        setLoading(true)
        reference.onSnapshot(snapshot => {
            const data = []
            snapshot.forEach(doc => {
                data.push(doc.data())
            })
            setStudentTasks(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getTasks()
    },// eslint-disable-next-line
    [])

    return (
        <div className="student-tasks">
            {loading ? 
                <h3>Loading...</h3> 
                : 
                studentTasks.map(stask => {
                    return (
                        <div key={stask.id} className="student-tasks-card">
                            <h4>{stask.name}</h4>
                            <img src={stask.image} alt={stask.task} />
                            <span>{stask.score}</span>
                        </div>
                    )
                })}
        </div>
    )
}

export default StudentTasks
