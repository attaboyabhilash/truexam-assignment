import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/truexam-logo.svg'
import { BsPersonFill } from "react-icons/bs"
import useAuthListener from '../hooks/useAuthListener'


function Header() {
    const location = useLocation()
    const { user } = useAuthListener()

    return (
        <div className="container">
            <div className="header">
                <Link to="/"><img src={Logo} alt="truexam-logo" /></Link>
                <div className="navigation">
                    {location.pathname === "/signin" ?  
                        <Link to="/signup">SignUp</Link>
                        :
                        location.pathname === "/dashboard" && location.pathname !== "/signin" && location.pathname !== "/signup" ?
                        <div className="profile">
                            {user && user.displayName ? <p>{user.displayName.charAt(0).toUpperCase()}</p> : <BsPersonFill className="person" />}
                        </div>
                        :
                        <Link to="/signin">SignIn</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
