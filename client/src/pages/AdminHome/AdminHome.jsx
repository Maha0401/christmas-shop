import React from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import axios from 'axios'

class AdminHome extends React.Component {

    state={
        isLoading: true,
        userInfo: {},
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')
        if (!!token) {
            axios.get('http://localhost:8080/user/current', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                this.setState({
                    userInfo: res.data,
                    isLoading: false
                })
            })
        } else {
            this.props.history.push('/login')
        }
    }

    render(){

        const { isLoading, userInfo } = this.state
        return isLoading ? 
            <h1>Loading...</h1> 
        :
            (
        
            <div>
                <AdminHeader username={userInfo.username}/>
            </div>
        )
    }
}

export default AdminHome
