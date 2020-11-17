import React from 'react'
import Vector from '../assets/truexam-hero-vector.svg'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className="landing-page">
            <div className="hero-left">
                <h1>India's Top Image Editing Bootcamp</h1>
                <p>Conducted by TruExam</p>
                <Link to="/signup"> SignUp Now</Link>
            </div>
            <div className="hero-right">
                <img src={Vector} alt="truexam-vector" />
            </div>
        </div>
    )
}

export default Hero
