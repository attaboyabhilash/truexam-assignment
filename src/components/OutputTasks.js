import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseContext'
import OutputTaskSlide from './OutputTaskSlide'

function OutputTasks({name}) {
    const { db } = useContext(FirebaseContext)
    const history = useHistory()
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
        return () => {
            history.push('/dashboard')
        }
    },// eslint-disable-next-line
    [])

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
