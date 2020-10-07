import React, { Fragment } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
function Detail({ product,dispatch,email }) {
  const [imgIndex, setImgIndex] = useState(0);
  const categories=product.categories;
  const categories_name=Object.keys(categories).filter(key=>key.includes('_name')).map(key=>[categories[key]])
  const handleChangeImg = (index) => {
    setImgIndex(index);
  }
  const [quantity,setQuantity]=useState(1);
  const increaseQuantity=()=>{
    setQuantity(quantity+1)
  }
  const decreaseQuantity=()=>{
    setQuantity(quantity-1)
    if (quantity===1) {
      setQuantity(quantity)
    }
  }
  const addCart=()=>{
    const cartItem={product:product,quantity:quantity,username:email}
    dispatch(addToCart(cartItem))
  }
  return (
    <Fragment>
      {categories_name.map((item,index)=>{
        return(
        index!==categories_name.length-1?<span key={index}>{item} &gt; </span>:<span key={index}>{item}</span>)
      })}
      <div className="container">
        <div className="card">
          <div className="container">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1"><img src={'https://media3.scdn.vn' + product.images[imgIndex]} /></div>
                </div>
                <ul className="preview-thumbnail nav nav-tabs">
                  {product.images.map((item, index) => <button key={item} type="button" onClick={() => handleChangeImg(index)}><img style={{ width: 50, height: 50 }} alt='' key={item} src={'https://media3.scdn.vn' + item} /></button>)}
                </ul>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.name}</h3>
                <div className="rating">
                  <div className="stars">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                  <span className="review-no">41 reviews</span>
                </div>
                {(product.final_price===product.price)?<h4 className="price">{Number(product.final_price).toLocaleString()}đ</h4>:<h4 className="price">{Number(product.final_price).toLocaleString()}đ <span>{Number(product.price).toLocaleString()}đ</span></h4>}
                <h5 className="sizes">kich co:
                  <span className="size" data-toggle="tooltip" title="small">s</span>
                  <span className="size" data-toggle="tooltip" title="medium">m</span>
                  <span className="size" data-toggle="tooltip" title="large">l</span>
                  <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                </h5>
                <h5 className="quantity">so luong:
                <span><button onClick={decreaseQuantity}>&#45;	</button>{quantity}<button onClick={increaseQuantity}>&#43;	</button></span></h5>
                <h5 className="colors">mau sac:
                  <span className="color orange not-available" data-toggle="tooltip" title="Not In store" />
                  <span className="color green" />
                  <span className="color blue" />
                </h5>
                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button" onClick={addCart}>add to cart</button>
                  <button className="like btn btn-default" type="button"><span className="fa fa-heart" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
const mapStatetoProps=state=>({
  email:state.email
})
const mapDispatchToProps=dispatch=>({
  dispatch
})
export default connect (mapStatetoProps,mapDispatchToProps) (Detail);