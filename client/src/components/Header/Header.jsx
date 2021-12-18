import React from 'react'
import Logo from '../../assets/images/jonar.png'
import { withRouter } from 'react-router-dom';
import './Header.scss'

class Header extends React.Component {

    state= {
        query: '',
    }

    handleLogoClick = () => {
        this.props.history.push('/')
    }

    handleSearch = () => {
        this.props.history.push(`/products/search`)
    }
    
    render () {
        return (
            <div className='hero'>
            <img onClick={this.handleLogoClick} className='hero__logo' src={Logo} alt='Jonar logo'></img>
            <input 
                onFocus={this.handleSearch}
                className="hero__search" 
                type='text' 
                placeholder="Search"
                value={this.state.query}>
            </input>
            </div>
        )
    }
}

export default withRouter(Header);
