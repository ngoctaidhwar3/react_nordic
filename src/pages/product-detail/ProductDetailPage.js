import React, { useCallback, useEffect, useState } from 'react';
import '../product-detail/ProductDetail.css';
import { makeProductDetailApi } from '../../common/util'
import Detail from '../product-detail/components/Detail'
function ProductDetailPage() {
  const [product,setProduct]=useState([]);
  const array = window.location.pathname.split('/');
  const pathName = array[2];
  const getProductDetail = useCallback(() => {
    fetch(makeProductDetailApi(pathName))
      .then((res) => res.json())
      .then(json => {
        setProduct(json)
      })
      .catch(err => {
        console.log(err)
      })
  },[product,pathName])
  useEffect(()=>{
    getProductDetail()
  },[])
  return (
    <Detail product={product} pathName={pathName} images={product.images}></Detail>
    )
}

export default ProductDetailPage;