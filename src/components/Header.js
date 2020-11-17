import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/truexam-logo.svg'

function Header() {
    return (
        <div className="container">
            <div className="header">
                <Link to="/"><img src={Logo} alt="truexam-logo" /></Link>
                <div className="navigation">
                    <Link to="/signin">SignIn</Link>
                    <Link to="/signup">SignUp</Link>
                </div>
            </div>
        </div>
    )
}

export default Header
