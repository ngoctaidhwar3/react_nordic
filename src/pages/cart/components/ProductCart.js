import React, { useState } from 'react';
import { connect } from 'react-redux';
import {getTotalPrice} from '../../../redux/actions'
function ProductCart({ item,callBackFromChild}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(item.quantity)
    const handlePrice = (event) => {
        console.log(event.target.value);
        setQuantity(event.target.value);
        //callBackFromChild(item.product.totalPrice*quantity);
        console.log(quantity)
        //dispatch(getTotalPrice(event.target.value))
        if (quantity === 1) {
            setQuantity(1)
        }
        
    }
    const getTotalPrice = (price) => {
        setTotalPrice(totalPrice + price);
    }
    
    return (
                <tr>
                    <td data-th="Product">
                        <div className="row">
                            <div className="col-sm-2 hidden-xs"><img src={'https://media3.scdn.vn' + item.product.images[0]} alt="..." className="img-responsive" /></div>
                            <div className="col-sm-10">
                                <h4 className="nomargin">{item.product.name}</h4>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">{Number(item.product.final_price).toLocaleString()}đ</td>
                    <td data-th="Quantity">
                        <input type="number" onChange={handlePrice} className="form-control text-center" defaultValue={quantity} />
                    </td>
                    <td data-th="Subtotal" className="text-center">{Number(item.product.final_price * quantity).toLocaleString()}đ</td>
                    <td className="actions" data-th>
                        <button className="btn btn-info btn-sm"><i className="fa fa-refresh" /></button>
                        <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o" /></button>
                    </td></tr>
            )
}
const mapDispatchToProps=dispatch=>({
    dispatch
})
export default connect(null,mapDispatchToProps) (ProductCart);