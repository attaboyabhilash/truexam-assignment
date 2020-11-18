import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/truexam-logo.svg'
import { BsPersonFill } from "react-icons/bs";
import { FirebaseContext } from '../contexts/FirebaseContext'


function Header() {
    const [loading, setLoading] = useState(true)
    const { app } = useContext(FirebaseContext)

    useEffect(() => {
        setTimeout(
            setLoading(false)  
        , 1000)      
    }, [])
    
    return (
        <div className="container">
            <div className="header">
                <Link to="/"><img src={Logo} alt="truexam-logo" /></Link>
                <div className="navigation">
                    <div className="profile">
                        {loading ? <BsPersonFill className="person" /> : <p>N</p>}
                        <div className="tooltip">
                            <span onClick={() => app.auth().signOut()}>
                                Sign out
				            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
