import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext'

function BackCard({ task }) {
    const [score, setScore] = useState(0)
    const { db } = useContext(FirebaseContext)

    const reference = db.collection('studentTasks')

    const handleScore = () => {
        reference
            .doc(task.dataid)
            .update({
                score: score
            })
            .then(() => {
                setScore(0)
            })   
    }

    const decre = () => {
        if(score > 0){
            setScore(prevScore => prevScore - 1)
        }
    }

    const incre = () => {
        if(score < 10){
            setScore(prevScore => prevScore + 1)
        }
    }

    return (
        <div>
            <hr />
            <span onClick={decre} className="minus">-</span>
                <span>{score}</span>
            <span onClick={incre} className="plus">+</span>
            <button onClick={handleScore}>Submit Score</button>
        </div>
    )
}

export default BackCard
