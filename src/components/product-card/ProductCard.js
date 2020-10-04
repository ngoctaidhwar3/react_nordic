/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import StarList from './components/StarList';
import './ProductCard.css';

function ProductCard({ product = {} }) {
    return (<div className="card ProductCard">
        <img className="card-img-top" src={product.img_url} alt="Card image cap" />
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{Number(product.price).toLocaleString()}đ</p>
            <StarList stars={product.percent_star} />
        </div>
    </div>)
}

export default ProductCard;