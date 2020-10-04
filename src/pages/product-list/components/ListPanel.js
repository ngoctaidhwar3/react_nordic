import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../components/product-card/ProductCard';
import './ListPanel.css'
function ListPanel({ products = [], page = 1, handleNext }) {
    const getNextLink = ()=> {
        return window.location.pathname+`?p=${++page}`;
    }
    // tương tự làm getBackLink
    const getBackLink = ()=> {
        return window.location.pathname+`?p=${--page}`;
    }
    return (
        <div className="ListPanel">
            <div className="row">
                {products.map(product =>
                    <div className="col-md-3">
                        <ProductCard product={product}/>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-md">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <Link className="page-link" to={getBackLink()}>Trước</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={getNextLink()}>Sau</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div >)
}

export default ListPanel;