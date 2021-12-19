import React from 'react'
import axios from 'axios';
import Input from '../../components/Input/Input';
import './Login.scss'
import Logo from '../../assets/images/jonar.png'
import { withRouter } from 'react-router-dom';


class Login extends React.Component {

    handleLogoClick = () => {
        this.props.history.push('/')
    }

    handleLogIn = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/user/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            this.props.history.push(`/admin-home`)
        })
    }
    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleLogIn}>
                    <img onClick={this.handleLogoClick} className='login__logo' src={Logo} alt='Jonar logo'></img>
                    <h1>Log In</h1>
                    <Input label="Username" name="username" type="text"/>
                    <Input label="Password" name="password" type="password" />
                    <button className='login__button' type="submit">Log In</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)
