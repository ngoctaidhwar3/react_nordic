import React from 'react';

function ProductDetailPage() {
    const array= window.location.pathname.split('/');
    const pathName=array[2];
    return (<h1>Product Detail Page {pathName}</h1>)
}

export default ProductDetailPage;