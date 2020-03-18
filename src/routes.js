import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import Cart from './pages/ShoppingCart';
import Favorites from './pages/Favorites';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage'
import Googleflow from './pages/GoogleFlowLogin'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage}></Route>
            <Route path="/home/:id" component={Home}></Route>
            <Route path="/carrinho" component={Cart}></Route>
            <Route path="/favoritos" component={Favorites}></Route>
            <Route path="/perfil" component={Profile}></Route>
            <Route path="/notificacao" component={Notification}></Route>
            <Route path="/configuracao" component={Settings}></Route>
            <Route path="/produto/:idProduct" component={ProductPage}></Route>
            <Route path="/buscaProduto/:busca" component={SearchPage}></Route>
            <Route path="/googleflow/:tokenId" component={Googleflow}></Route>
        </BrowserRouter>
    );
}

export default Routes;