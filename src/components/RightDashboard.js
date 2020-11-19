import React from 'react'
import { useParams } from 'react-router-dom'

function RightDashboard() {
    const { id } = useParams()
    return (
        <div className="dash-right">
            <div className="placeholder-text">
                <h1>Task No. {id}</h1>
            </div>
        </div>
    )
}

export default RightDashboard
