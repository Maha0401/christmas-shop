import React from 'react'
import axios from 'axios'

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
                    <h2>Available Stocks</h2>
                    {
                    //     this.state.stockList.map(stock=>{
                    //     return (
                    //         <div className='stock'>
                    //             {console.log(stock)}
                    //             <img className='stock__image' src={`http://localhost:8080/${stock.picUrlPath}`} alt={`${stock.productName} poster`}></img>
                    //             <h3 className='stock__name'>{stock.name}</h3>   
                    //             <p>Available: {stock.stock}</p>                         
                    //         </div>  
                    //     )
                    // })
                }
                </div>
            </div>
        )
    }
}

export default Stocks
