import React from 'react'
import './Footer.scss'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className='footer'>
            <h4 className='footer__quote'>An experiment in trying to be better</h4>
            <div className='footer__contact-address'>
                <div className='footer__contact'>
                    <p>info@jonar.com</p>
                    <p>+1.833.335.5525</p>
                </div>
                <div className='footer__address'>
                    <p>55 Rue de Louvain O,</p>
                    <p>Suite 303,</p>
                    <p>Montreal, Quebec,</p>
                    <p>H2N 1A4, Canada</p>
                </div>
            </div>
            <Link className='footer__login' to='./login' >Admin Login</Link>
            <p className='footer__copy-right'>©Jonar 2021</p>
        </div>
    )
}

export default Footer
