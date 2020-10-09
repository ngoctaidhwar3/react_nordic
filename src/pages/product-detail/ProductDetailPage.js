import React, { useCallback, useEffect } from 'react';
import '../product-detail/ProductDetail.css';
import Detail from '../product-detail/components/Detail'
import { connect } from 'react-redux';
import {getProductDetail} from '../../redux/actions';

function ProductDetailPage({dispatch,product}) {
  const array = window.location.pathname.split('/');
  const pathName = array[2];
  const getProductDetails = useCallback(() => {
    dispatch(getProductDetail(pathName))
  }, [dispatch,pathName])
  useEffect(() => {
    getProductDetails()
  }, [getProductDetails])
  if (product) {
    return (
    <Detail key={product.product_id} product={product}></Detail>
      )
  }
  else if (product===undefined) return (
    <div></div>
  )
}
const mapStateToProps=state=>({
  product:state.product,
})
const mapDispatchToProps=dispatch=>({
  dispatch
})
export default connect(mapStateToProps,mapDispatchToProps) (ProductDetailPage);