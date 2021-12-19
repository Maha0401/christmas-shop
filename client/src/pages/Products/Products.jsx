import React from 'react'
import Logo from '../../assets/images/jonar.png'
import './Products.scss'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'
import orderSuccess from '../../assets/images/bg-home-alone-3.jpg'


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

    sortAsc = (products) => {   
        products.sort(function(a, b){
            var A = a.price
            var B = b.price
            return A - B;
        });
        return products;
    }
    sortDesc = (products) => {
        products.sort(function(a, b){
            var A = a.price
            var B = b.price
            return B - A;
        });
        return products;
    }

    sortPrice = (order) => {
        if(order === 'asc'){
            this.setState({
                products: this.sortAsc(this.state.products)
            });
        }
        else if(order === 'desc'){
            this.setState({
                products: this.sortDesc(this.state.products)
            });
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
                    <select name='sort' onChange={(e) => this.sortPrice(e.target.value)}                    
                        className="products-hero__sort">
                        <option value="">Sort Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                    <select name='filter'                     
                        className="products-hero__filter">
                        <option value="">Filter Color</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="black">Black</option>
                    </select>
                </div>
                <div className='products__product-list'>
                    {this.state.products.map(product => {
                        return(
                            <div className='product-list' key = {product.id}>
                                <img className='product-list__product-image' src={`http://localhost:8080/${product.picUrlPath}`} alt={`${product.productName} poster`}></img>
                                <h2 className='product-list__product-name'>{product.productName}</h2>
                                <h2 className='product-list__product-description'>{product.description}</h2>
                                <p>${product.price}</p>
                                <input className='product-list__button' type='button' onClick={()=>this.buyButtonHandle(product)} value='Buy' ></input>
                            </div>
                            )}
                    )}        
                </div>
                <div className={'order__popup '+this.state.display}>
                    <div className='order__popup-content'>
                        <img className='order__image' src={orderSuccess} alt = 'nice selection' ></img>
                        <p className='order__successful'>Ordered Successful</p>
                        <input className='order__okay-button' onClick={this.okayModalHandler} type='button' value='ok'></input>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Products
