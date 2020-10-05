import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cateSlugs } from '../../common/constants';
import { getProductsByCate, searchProducts } from '../../redux/actions';
import FilterPanel from './components/FilterPanel';
import ListPanel from './components/ListPanel';
import queryString from 'query-string';
import './ProductListPage.css';

let title = '';
function ProductListPage({ dispatch, products,searchKey }) {
    const { cateSlug } = useParams();
    const { q, p } = queryString.parse(window.location.search);
    const handleGetProducts = useCallback(()=>{
        if (q) {
            title = q;
            dispatch(searchProducts(q, p))
        }
        else if (cateSlug) {
            dispatch(getProductsByCate(cateSlug, p));
            const cate = cateSlugs.find(item => item.slug === cateSlug);
            title = cate && cate.label;
        }
    },[cateSlug, dispatch, p, q])
    useEffect(() => {
        handleGetProducts();
    }, [handleGetProducts,p])
    return (<div className="container ProductListPage">
        <div class="row justify-content-md-center">
            <div class="col-md-2">
                <FilterPanel />
            </div>
            <div class="col-md-10">
                <h4>{title}({products ? products.length : 0})</h4>
                <ListPanel products={products} searchKey={searchKey} page={p ? parseInt(p) : 1} />
            </div>
        </div>
    </div>)
}

const mapStateToProps = state => ({
    products: state.products,
    searchKey:state.searchKey
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);