import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext'
import { GlobalContext } from '../contexts/GlobalContext'
import OutputTaskSlide from './OutputTaskSlide'

function OutputTasks({name}) {
    const { db } = useContext(FirebaseContext)
    const [tasks, setTasks] = useState([])
    const { update } = useContext(GlobalContext)

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
    [update])

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
                        <Link to={`/dashboard/${task.id}`} key={task.id}>
                            <OutputTaskSlide task={task} />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default OutputTasks
