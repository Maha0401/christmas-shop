import React from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import axios from 'axios'
import Stocks from '../../components/Stocks/Stocks'
import Graphs from '../../components/Graphs/Graphs'
import Orders from '../../components/Orders/Orders'
import './AdminHome.scss'

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
            <h1>Snowing and Loading...</h1> 
        :
            (
        
            <div>
                <AdminHeader username={userInfo.username}/>
                <div className='orders-stocks'>
                    <Orders />
                    <Stocks />
                </div>
                <Graphs />
            </div>
        )
    }
}

export default AdminHome
