import React from 'react'
import Logo from '../../assets/images/jonar.png'
import './Products.scss'
import axios from 'axios'


class Products extends React.Component {
    state = {
        query:'',
        products: [],
        isLoading: true,
        errorLoading: false,
        display: '',
    }

    handleLogoClick = () => {
        this.props.history.push('/')
    }

    handleSearch = (event) => {
        this.setState({
            query: event.target.value,
          });
    }

    okayModalHandler = () => {
        this.setState({display:''})
    }

    buyButtonHandle = (product) => {
        axios
        .post(`http://localhost:8080/order/`
            , {
                "productName": product.productName,
                "productId": product.id,
                "picUrlPath": product.picUrlPath,
                "orderPrice": product.price,
            }
        )
        .then((res) => {
            this.setState({display:'order__popup--show'})
        }) 
    }

    getProducts = (query) => {
        if(!query){
            this.setState({
                query: "",
                products:[]
            })
            return ;
        }
        axios
            .get(`http://localhost:8080/product/search/${query}`)
            .then((response) => {
            this.setState({
                errorLoading: false,
                query: query,
                products: response.data,
            });
            })
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
    };

    componentDidMount(){
        if(this.props.match.params.category){
            axios
            .get(`http://localhost:8080/product/category/${this.props.match.params.category}`)
            .then((response) => {
            this.setState({
                isLoading: false,
                products: response.data,
            });
            })
            .catch((error) => {
            this.setState({
                errorLoading: true,
            });
            });
        }
        else{
            this.setState({
                isLoading: false,
                products: [],
            });
        }
    }

    componentDidUpdate(_prevProps, prevState) {
        const query = this.state.query;
        const prevQuery = prevState.query;
    
        // Only get products if the query has changed since last setState occurred!
        if (query !== prevQuery) {
          this.getProducts(query);
        }
    }

    render(){
        return this.state.isLoading ? 
            <h1>Loading...</h1> 
        :
            (
            <div className='products'>
                <div className='products-hero'>
                    <img onClick={this.handleLogoClick} className='products-hero__logo' src={Logo} alt='Jonar logo'></img>
                    <input
                        autoFocus
                        onChange={this.handleSearch}
                        className="products-hero__search"
                        type='text'
                        placeholder="Search"
                        value={this.state.query}>
                    </input>
                </div>
                <div className='products__product-list'>
                    {this.state.products.map(product => {
                        return(
                            <div className='products__product' key = {product.id}>
                                <img className='products__product-image' src={`http://localhost:8080/${product.picUrlPath}`} alt={`${product.productName} poster`}></img>
                                <h2 className='products__product-name'>{product.productName}</h2>
                                <h2 className='products__product-description'>{product.description}</h2>
                                <input type='button' onClick={()=>this.buyButtonHandle(product)} value='Buy' ></input>
                            </div>
                            )}
                    )}        
                </div>
                <div className={'order__popup '+this.state.display}>
                    <div className='order__popup-content'>
                        <p className='order__successful'>Ordered Successful</p>
                        <input className='order__okay-button' onClick={this.okayModalHandler} type='button' value='ok'></input>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products
