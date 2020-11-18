import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/truexam-logo.svg'


function Header() {
    const location = useLocation()
   
    return (
        <div className="container">
            <div className="header">
                <Link to="/"><img src={Logo} alt="truexam-logo" /></Link>
                <div className="navigation">
                    {location.pathname === "/signin" ?  
                        <Link to="/signup">SignUp</Link>
                        :
                        <Link to="/signin">SignIn</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
