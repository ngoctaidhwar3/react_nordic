import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../components/product-card/ProductCard';
import './ListPanel.css'
function ListPanel({ products = [], page, searchKey }) {
    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
    },[page])
    const getNextLink = () => {
        if (searchKey)
            return (window.location.pathname + `?q=${searchKey}` + `&p=${++page}`);
        else {
            return (window.location.pathname + `?p=${++page}`);
        }
    }
    const getBackLink = () => {
        if (searchKey)
            return (window.location.pathname + `?q=${searchKey}` + `&p=${--page}`);
        else {
            return (window.location.pathname + `?p=${--page}`);
        }
    }

    return (
        <div className="ListPanel">
            <div className="row">
                {products.map(product =>
                    <div key={product.product_id} className="col-md-3">
                        <Link to={`/detail/${product.product_id}`}><ProductCard key={product.product_id} product={product} /></Link>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-md">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <Link className="page-link" to={getBackLink}>Trước</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={getNextLink}>Sau</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div >)
}
export default ListPanel;