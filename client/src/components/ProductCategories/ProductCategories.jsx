import React from 'react'
import Decor from '../../assets/images/decor.jpg'
import Sweater from '../../assets/images/sweater.jpg'
import Gift from '../../assets/images/gift.jpg'
import './ProductCategories.scss'

function ProductCategories({handleCategoryClick}) {
    return (
        <div className='categories'>
            <div onClick = {()=>{handleCategoryClick('sweater')}} className="categories__category">
                <h4 className='categories__name'>Ugly Christmas Sweaters</h4>
                <img className='categories__image' src={Sweater} alt='Christmas Decor'></img>
            </div>
            <div onClick = {()=>{handleCategoryClick('decor')}} className="categories__category">
                <h4 className='categories__name'>Decorations</h4>
                <img className='categories__image' src={Decor} alt='Christmas decor'></img>
            </div>
            <div onClick = {()=>{handleCategoryClick('gift')}} className="categories__category">
                <h4 className='categories__name'>Gifts</h4>
                <img className='categories__image' src={Gift} alt='Christmas  Gift'></img>
            </div>
        </div>
    )
}

export default ProductCategories
