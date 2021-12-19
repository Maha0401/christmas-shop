import React from 'react'
import axios from 'axios'
import './Stocks.scss'

class Stocks extends React.Component {

    state ={
        stockList: [],
        isLoading: true,
    }

    sortedStockList = (Stocks) => {
        Stocks.sort(function(a, b){
            var A = a.stock
            var B = b.stock
            return A - B;
        });
        return Stocks;
    }

    getStockList = () => {
        axios.get('http://localhost:8080/product/stocks')
        .then (res=>{
            this.setState({
                stockList: this.sortedStockList(res.data),
                isLoading: false
            })
        })
    }

    componentDidMount() {
        this.getStockList();
    }

    render() {
        return this.state.isLoading ? 
            <h1>Snowing and Loading...</h1> 
        :
            (
            <div>
                <div className='stocks'>
                    <h2 className='stocks__header'>Available Stocks</h2>
                    
                        {this.state.stockList.map(stock=>{
                        return (
                            <div className='stock'>
                                <img className='stock__image' src={`http://localhost:8080/${stock.picUrlPath}`} alt={`${stock.productName} poster`}></img>
                                <div className='stock__info' >
                                    <h4 className='stock__name'>{stock.name}</h4>
                                    <p className='stock__available'>Available: {stock.stock}</p>
                                </div>                         
                            </div>  
                        )
                        })}
                
                </div>
            </div>
        )
    }
}

export default Stocks
