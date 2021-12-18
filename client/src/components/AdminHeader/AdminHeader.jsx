import React from 'react'
import './AdminHeader.scss'
import Logo from '../../assets/images/jonar.png'
import { withRouter } from 'react-router-dom';

class AdminHeader extends React.Component {
    
    handleLogoClick =()=>{
        this.props.history.push('/admin-home')
    }

    handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken');
        this.props.history.push('/login')
    };

    render(){
        return (
            <div className='header'>
                <img onClick={this.handleLogoClick} className='header__logo' src={Logo} alt='Jonar logo'></img>
                <div className='header__user-info'>
                    <h1 className='header__greeting'>Welcome! {this.props.username}</h1>
                    <button className='header__logout' onClick={this.handleLogOut}>Log Out</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminHeader);
