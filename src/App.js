import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MessageModal from './components/message/MessageModal';
import Navigation from './components/Navigation';
import LoginPage from './pages/auth/LoginPage';
import CartPage from './pages/cart/CartPage';
import HomePage from './pages/home/HomePage';
import ProductDetailPage from './pages/product-detail/ProductDetailPage';
import ProductListPage from './pages/product-list/ProductListPage';
function App() {
  return (
      <Router>
      <Navigation />
        <Switch>
          <Route exact path='/'><HomePage /></Route>
          <Route exact path='/time-kiem'><ProductListPage /></Route>
          <Route exact path='/detail/:id'><ProductDetailPage /></Route>
          <Route exact path='/cart'><CartPage /></Route>
          <Route exact path='/login'><LoginPage /></Route>
          <Route exact path='/:cateSlug'><ProductListPage /></Route>
        </Switch>
        <MessageModal/>
      </Router>
  );
}

export default App;
