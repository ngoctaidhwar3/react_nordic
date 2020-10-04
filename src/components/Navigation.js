import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { cateSlugs } from '../common/constants';
import { logOut } from '../redux/actions';
import ListIcon from './icons/ListIcon';
import './Navigation.css';
function Navigation(props) {
    const history = useHistory();
    const [query, setQuery] = useState();

    const handleChange = (event) => {
        setQuery(event.target.value);
    }
    const handleSearch = (event) => {
        event.preventDefault();
        history.push('/tim-kiem?q=' + query)
    }
    const handleLogout = (event)=>{
        event.preventDefault();
        props.dispatch(logOut());
    }
    if(!props.email) return <Redirect to='/login'/>;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark Navigation">
            <Link className="navbar-brand" to="/">
                <img src="/logo.svg" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <ListIcon />
                            &nbsp;
                            Danh mục
        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {cateSlugs.map(cate => <Link key={cate.slug} className="dropdown-item" to={cate.slug}>{cate.label}</Link>)}
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Tất cả</a>
                        </div>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0 mr-auto" onSubmit={handleSearch}>
                    <input onChange={handleChange} className="form-control mr-sm-2" type="search" placeholder="Tìm sản phẩm" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm</button>
                </form>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart"><img className="icon" alt="" src="icons/cart-white.svg" /></Link>
                    </li>


                    {props.email ?
                        <li className="nav-item dropdown dropleft">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img alt="" className="rounded Navigation-avatar" src="https://thumbs.dreamstime.com/b/avatar-video-game-warrior-avatar-video-game-warrior-illustration-design-96277585.jpg" />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="profileDropdown">
                                <a className="dropdown-item" href="#">Thông tin cá nhân</a>
                                <a className="dropdown-item" href="#">Đổi mật khẩu</a>
                                <div className="dropdown-divider"></div>
                                <a onClick={handleLogout} className="dropdown-item" href="#">Đăng xuất</a>
                            </div>
                        </li>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><img alt="" src="icons/people.svg" />&nbsp;Đăng nhập</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    email: state.email
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);