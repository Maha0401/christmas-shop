import React from 'react'
import Logo from '../../assets/images/jonar.png'
import { withRouter } from 'react-router-dom';
import './Header.scss'

function Header({handleQueryChange, query}) {

    const handleLogoClick =()=>{
        this.props.history.push('/admin-home')
    }

    return (
        <div className='hero'>
        <img onClick={handleLogoClick} className='hero__logo' src={Logo} alt='Jonar logo'></img>
        <input 
            onChange={handleQueryChange} 
            className="hero__search" 
            type='text' 
            placeholder="Search"
            value={query}>
        </input>
        </div>
    )
}

export default withRouter(Header);
