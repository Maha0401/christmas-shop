import React from 'react'
import axios from 'axios';
import Input from '../../components/Input/Input';
import './Login.scss'


function Login(props) {

    const handleLogIn = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/user/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            props.history.push(`/admin-home`)
        })
    }

    return (
        <div className="login">
            <form onSubmit={handleLogIn}>
                <h1>Log In</h1>
                <Input label="Username" name="username" type="text"/>
                <Input label="Password" name="password" type="password" />
                <button className='login__button' type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login
