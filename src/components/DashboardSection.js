import React, { useRef, useContext } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { FirebaseContext } from '../contexts/FirebaseContext'
import InputForm from './InputForm'
import OutputTasks from './OutputTasks'
import useAuthListener from '../hooks/useAuthListener';

function DashboardSection() {
    const { app } = useContext(FirebaseContext)
    const { user } = useAuthListener();
    const inputRef = useRef(null)
    const handleClick = () => {
        if(inputRef.current.style.display === "block"){
            inputRef.current.style.display = "none"
        }else{
            inputRef.current.style.display = "block"
        }
        
    }
    return (
        <div className="dashboard">
            <div className="dash-left">
                <div className="dash-head">
                <h3>Welcome, {user && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</h3>
                    <span onClick={() => app.auth().signOut()}>
                        Sign out
                    </span>
                </div>
                <div className="dash-task" onClick={handleClick}>
                    <p>Create A New Task</p>
                    <MdAddCircle className="add" />
                </div>
                <div ref={inputRef} className="dash-input">
                    <InputForm />
                </div>
                <OutputTasks name={user.displayName} />
            </div>
            <div className="dash-right">
                <div className="placeholder-text">
                    <h1>No Task Available</h1>
                    <p>Please create a new task</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardSection
