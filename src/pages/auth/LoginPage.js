import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, loginStart } from '../../redux/actions';

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handleChangePassword = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        props.dispatch(login(email,password));
    }
    if(props.email)
    return <Redirect to='/'/>
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>Email: {props.email}</h1>
                <h2>{props.startLogin && 'Loggin....'}</h2>
                <h2>{props.loginFail && 'Login is failed'}</h2>
                <form onSubmit={handleSubmit} style={{ width: '100%', backgroundColor: 'bisque', padding: 10 , margin: 20}}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input disabled={props.startLogin} onChange={handleChangeEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input disabled={props.startLogin} onChange={handleChangePassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-check">
                        <input  type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button disabled={props.startLogin} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>)
}

const mapStateToProps = state =>({
    isLoginFail:state.loginFail,
    email: state.email,
    startLogin: state.startLogin,
    loginFail: state.loginFail
})

const mapDispatchToProps = dispatch =>({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);