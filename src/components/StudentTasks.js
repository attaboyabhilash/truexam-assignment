import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'
import BackCard from './BackCard'

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
                data.push({
                    data: doc.data(),
                    dataid: doc.id
                })
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
                        <div key={Math.random()} className="student-tasks-card">
                            <h4>{stask.data.name}</h4>
                            <img src={stask.data.image} alt={stask.data.task} />
                            <p>Score - {stask.data.score}/10</p>    
                            <div className="down">
                                <BackCard task={stask} />
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default StudentTasks
