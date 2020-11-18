import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/truexam-logo.svg'
import { BsPersonFill } from "react-icons/bs";


function Header() {

    return (
        <div className="container">
            <div className="header">
                <Link to="/"><img src={Logo} alt="truexam-logo" /></Link>
                <div className="navigation">
                    <div className="profile">
                        <BsPersonFill className="person" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
