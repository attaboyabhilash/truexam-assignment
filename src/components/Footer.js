import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/truexam-whiteLogo.svg'
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <Link to="/"><img src={Logo} alt="truexam-whiteLogo" /></Link>
                <div className="footer-social-media">
                    <a target="__blank" href="https://www.instagram.com/truexam/"><FaInstagram className="insta" /></a>
                    <a target="__blank" href="https://twitter.com/Truexam_in"><FaTwitter className="twitter" /></a>
                    <a target="__blank" href="https://github.com/TruExam"><FaGithub className="github" /></a>
                    <a target="__blank" href="https://www.linkedin.com/company/truexam/"><FaLinkedinIn className="linkedin" /></a>
                </div>
                <small>Copyright &copy; 2020, Truexam Edu Solutions Pvt. Ltd. All rights reserved.</small>
            </div>
        </div>
    )
}

export default Footer
