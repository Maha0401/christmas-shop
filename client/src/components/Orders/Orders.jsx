import React from 'react'
import './Orders.scss'
import axios from 'axios'

class Orders extends React.Component {

    state ={
        orderList: [],
        isLoading: true,
    }

    getOrderList = () => {
        axios.get('http://localhost:8080/order/notfullfilled')
        .then (res=>{
            this.setState({
                orderList: res.data,
                isLoading: false
            })
        })
    }

    handleFulfilled = (id) => {
        axios.put(`http://localhost:8080/order/fullfilled/${id}`)
        .then (res=>{
        })
        .then (()=>{
            this.setState({
                isLoading:true
            })
        })
        .then(()=>{
            this.getOrderList();
        })
    }

    componentDidUpdate(_prevProps, prevState) {
        const orderList = this.state.orderList;
        const prevOrderList = prevState.query;
    
        if (orderList !== prevOrderList) {
            this.getOrderList();
        }
    }

    componentDidMount() {
        this.getOrderList();
    }

    render(){
        return this.state.isLoading ? 
            <h1>Snowing and Loading...</h1> 
        :
            (
            <div>
                <div className='orders'>
                    <h2 className='orders__header'>Current Orders</h2>
                    {this.state.orderList.map(order=>{
                        return (
                            <div className='order'>
                                <img className='order__image' src={`http://localhost:8080/${order.picUrlPath}`} alt={`${order.productName} poster`}></img>
                                <h3 className='order__name'>Product: {order.productName}</h3>                            
                                <input onClick={()=>this.handleFulfilled(order.id)} className='order__button' type='button' value='Fullfilled'></input>
                            </div>  
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Orders
