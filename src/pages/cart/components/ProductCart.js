import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductCart({ item, callBackFromChild, cart, onDelete }) {
    const [quantity, setQuantity] = useState(item.quantity)
    const totalPrice = quantity * item.product.final_price
    const findCart = cart.findIndex((key) => key.product.id === item.product.id)
    useEffect(() => {
        changedQuantityCart(quantity)
        const array = { 'id': cart[findCart].product.id, 'quantity': cart[findCart].quantity }
        callBackFromChild(array)
    }, [quantity, cart])
    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const changedQuantityCart = (value) => {
        cart[findCart].quantity = value
    }
    const decreaseQuantity = () => {
        setQuantity(quantity - 1)
        if (quantity === 1) {
            setQuantity(quantity)
        }
    }

    return (
        <tr>
            <td data-th="Product">
                <div className="row">
                    <div className="col-sm-2 hidden-xs"><img src={'https://media3.scdn.vn' + item.product.images[0]} alt="..." className="img-responsive" /></div>
                    <div className="col-sm-10">
                        <Link to={`/detail/${item.product.id}`}><h4 className="nomargin">{item.product.name}</h4></Link>
                    </div>
                </div>
            </td>
            <td data-th="Price">{Number(item.product.final_price).toLocaleString()}đ</td>
            <td data-th="Quantity">
                <span><button onClick={decreaseQuantity}>&#45;	</button>{quantity}<button onClick={increaseQuantity}>&#43;	</button></span>
            </td>
            <td data-th="Subtotal" className="text-center">{Number(totalPrice).toLocaleString()}đ</td>
            <td className="actions" data-th>
                <button className="btn btn-info btn-sm"><i className="fa fa-refresh" /></button>
                <button className="btn btn-danger btn-sm" onClick={()=>onDelete(item.product.id)}><i className="fa fa-trash-o" /></button>
            </td></tr>
    )
}
const mapDispatchToProps = dispatch => ({
    dispatch
})
export default connect(null, mapDispatchToProps)(ProductCart);