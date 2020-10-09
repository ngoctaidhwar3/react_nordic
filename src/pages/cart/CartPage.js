import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../pages/cart/CartPage.css';
import ProductCart from './components/ProductCart';
import {getNewCart} from '../../redux/actions'
function CartPage({ cart,dispatch }) {
    const [temp, setTemp] = useState(0);
    const [cartState,setCartState]=useState(cart)
    const callBackFromChild=(dataFromChild)=>{
        setTemp(dataFromChild)
    }
    const getQuantityChange=()=>{
        const cartt=cartState.findIndex(item=>item.product.id===temp.id)
        if(cartt!==-1){
            cartState[cartt].quantity=temp.quantity
        }
    }
    useEffect(()=>{
        getQuantityChange()
    },[getQuantityChange,temp,cartState])
    
    const calTotalPrice=()=>{
        const result = cartState.reduce(function(tot, arr) { 
            return tot + (arr.quantity*arr.product.final_price);
          },0);
          return result;
    }
    const onDelete=(itemId)=>{
        const items = cartState.filter(item => item.product.id !== itemId);
        setCartState(items)
        dispatch(getNewCart(items))
    }

    if (cartState.length === 0) {
        return (
            <div className="col-12 justify-content-center text-center"><h1>Giỏ hàng của bạn rỗng</h1>
            <div className="col-12 justify-content-center text-center"><Link to="/" className="btn btn-warning">Tiếp tục mua sắm</Link></div>
            </div>
        )
    }
   
    else {
        return (
            <div className="container">
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Sản phẩm</th>
                            <th style={{ width: '10%' }}>Giá</th>
                            <th style={{ width: '8%' }}>Số lượng</th>
                            <th style={{ width: '22%' }} className="text-center">Tổng tiền</th>
                            <th style={{ width: '10%' }} />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartState.map((item) => {
                                return (
                                    <ProductCart onDelete={onDelete} callBackFromChild={callBackFromChild} key={item.product.id} item={item} cart={cart}></ProductCart>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Link to="/" className="btn btn-warning"><i className="fa fa-angle-left" />Tiếp tục mua sắm</Link></td>
                            <td colSpan={2} className="hidden-xs" />
                            <td className="hidden-xs text-center">
                                <strong>Thành tiền {Number(calTotalPrice()).toLocaleString()}đ</strong></td>
                            <td><a href="#" className="btn btn-success btn-block">Thanh toán <i className="fa fa-angle-right" /></a></td>
                        </tr>
                    </tfoot>
                </table>
            </div>)
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})
const mapDispatchToProps=dispatch=>({
    dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(CartPage);