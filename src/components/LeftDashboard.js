import React, { useRef, useContext } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { ImMenu2 } from 'react-icons/im'
import { FirebaseContext } from '../contexts/FirebaseContext'
import InputForm from './InputForm'
import OutputTasks from './OutputTasks'
import useAuthListener from '../hooks/useAuthListener'

function LeftDashboard() {
    const { app } = useContext(FirebaseContext)
    const { user } = useAuthListener();
    const inputRef = useRef(null)
    const menuRef = useRef(null)
    const handleClick = () => {
        if(inputRef.current.style.display === "block"){
            inputRef.current.style.display = "none"
        }else{
            inputRef.current.style.display = "block"
        }
        
    }

    const handleMenu = () => {
        if(menuRef.current.style.left === "0px"){
            menuRef.current.style.left = "-325px"
        }else{
            menuRef.current.style.left = "0px"
        }
    }

    return (
        <div ref={menuRef} className="dash-left">
            <div className="dash-head">
                <ImMenu2 className="menu-sm" onClick={handleMenu} />
                <h3>Welcome, {user && user.displayName ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1) : "Prof."}</h3>
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
            <OutputTasks name={user.displayName && user.displayName} />
        </div>
    )
}

export default LeftDashboard
