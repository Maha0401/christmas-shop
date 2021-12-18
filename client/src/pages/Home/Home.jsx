import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductCategories from '../../components/ProductCategories/ProductCategories'

class Home extends React.Component {

    handleCategoryClick = (category) =>{
                this.props.history.push(`/products/${category}`) 
    }

    render(){
        return (
            <div>
                <Header />
                <ProductCategories handleCategoryClick={this.handleCategoryClick}/>
                <Footer />
            </div>
        )
    }
}

export default Home
