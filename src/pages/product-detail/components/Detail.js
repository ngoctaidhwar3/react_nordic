import React, { Fragment } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarList from '../../../components/product-card/components/StarList'
import { addToCart,getDuplicateProductId } from '../../../redux/actions';
function Detail({ product, dispatch, email,cart }) {
  const [imgIndex, setImgIndex] = useState(0);
  const categories = product.categories;
  const categories_name = Object.keys(categories).filter(key => key.includes('_name')).map(key => [categories[key]])
  const categories_path = Object.keys(categories).filter(key => key.includes('_path')).map(key => [categories[key]])
  for (let index = 0; index < categories_path.length; index++) {
    categories_name[index].path = categories_path[index]
  }
  const handleChangeImg = (index) => {
    setImgIndex(index);
  }
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
    if (quantity === 1) {
      setQuantity(quantity)
    }
  }
  const addCart = () => {
    const temp=cart.findIndex(item=>item.product.id===product.id)
    const cartItem = { product: product, quantity: quantity, username: email }
    if(temp!==-1){
      dispatch(getDuplicateProductId(temp,quantity))
    }
    dispatch(addToCart(cartItem,temp,quantity))
  }
  return (
    <Fragment>
      {categories_name.map((item, index) => {
        return (
          index !== categories_name.length - 1 ? <span key={index}><Link to={`/${item.path}`}>{item[0]}</Link> &gt; </span> : <span key={index}>{item[0]}</span>)
      })}
      <div className="container">
        <div className="card">
          <div className="container">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1"><img alt='' src={'https://media3.scdn.vn' + product.images[imgIndex]} /></div>
                </div>
                <ul className="preview-thumbnail nav nav-tabs">
                  {product.images.map((item, index) => <button key={item} type="button" onClick={() => handleChangeImg(index)}><img style={{ width: 50, height: 50 }} alt='' key={item} src={'https://media3.scdn.vn' + item} /></button>)}
                </ul>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.name}</h3>
                <div className="rating">
                  <div className="stars">
                    <StarList stars={product.percent_star} />
                  </div>
                </div>
                {(product.final_price === product.price) ? <h4 className="price">{Number(product.final_price).toLocaleString()}đ</h4> : <h4 className="price">{Number(product.final_price).toLocaleString()}đ <span>{Number(product.price).toLocaleString()}đ</span></h4>}
                <h5 className="sizes">kích cỡ:
                  <span className="size" data-toggle="tooltip" title="small">s</span>
                  <span className="size" data-toggle="tooltip" title="medium">m</span>
                  <span className="size" data-toggle="tooltip" title="large">l</span>
                  <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                </h5>
                <h5 className="quantity">số lượng:
                <span><button onClick={decreaseQuantity}>&#45;	</button>{quantity}<button onClick={increaseQuantity}>&#43;	</button></span></h5>
                <h5 className="colors">màu sắc:
                  <span className="color orange not-available" data-toggle="tooltip" title="Not In store" />
                  <span className="color green" />
                  <span className="color blue" />
                </h5>
                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button" onClick={addCart}>add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
const mapStatetoProps = state => ({
  email: state.email,
  cart:state.cart
})
const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(mapStatetoProps, mapDispatchToProps)(Detail);