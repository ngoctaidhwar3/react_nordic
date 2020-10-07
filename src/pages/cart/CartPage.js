import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../pages/cart/CartPage.css'
function CartPage({ cart }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const getTotalPrice = (price) => {
        setTotalPrice(totalPrice + price)
        console.log(price)
    }
    if (cart.length === 0) {
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
                            cart.map((item) => {
                                return (
                                    <tr onLoad={()=>getTotalPrice(item.product.final_price*item.quantity)} key={item.product.id}><td data-th="Product">
                                        <div className="row">
                                            <div className="col-sm-2 hidden-xs"><img src={'https://media3.scdn.vn' + item.product.images[0]} alt="..." className="img-responsive" /></div>
                                            <div className="col-sm-10">
                                                <h4 className="nomargin">{item.product.name}</h4>
                                            </div>
                                        </div>
                                    </td>
                                        <td data-th="Price">{Number(item.product.final_price).toLocaleString()}đ</td>
                                        <td data-th="Quantity">
                                            <input type="number" className="form-control text-center" defaultValue={item.quantity} />
                                        </td>
                                        <td data-th="Subtotal"  className="text-center">{Number(item.product.final_price * item.quantity).toLocaleString()}đ</td>
                                        <td className="actions" data-th>
                                            <button className="btn btn-info btn-sm"><i className="fa fa-refresh" /></button>
                                            <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o" /></button>
                                        </td></tr>
                                )
                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Link to="/" className="btn btn-warning"><i className="fa fa-angle-left" />Tiếp tục mua sắm</Link></td>
                            <td colSpan={2} className="hidden-xs" />
                            <td className="hidden-xs text-center"><strong>Thành tiền {Number(totalPrice).toLocaleString()}đ</strong></td>
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

export default connect(mapStateToProps, null)(CartPage);