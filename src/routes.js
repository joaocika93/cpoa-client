import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/HomePage'
import Cart from './pages/ShoppingCart'
import Favorites from './pages/Favorites'
import Notification from './pages/Notification'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import Googleflow from './pages/GoogleFlowLogin'
import Facebookflow from './pages/FacebookFlowLogin'
import Policy from './pages/PrivacyPolicy'
import Administrador from './pages/administradorPage'
import AgendaEncomenda from './pages/administradorPage/AgendaEncomenda'
import CadastrarProduto from './pages/administradorPage/CadastrarProduto'
import ControleEstoque from './pages/administradorPage/ControleEstoque'
import EditarProduto from './pages/administradorPage/EditarProduto'
import ExcluirProduto from './pages/administradorPage/ExcluirProduto'
import RelatorioEncomendas from './pages/administradorPage/RelatorioEncomendas'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage}></Route>
            <Route path="/policy" exact component={Policy}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/carrinho" component={Cart}></Route>
            <Route path="/favoritos" component={Favorites}></Route>
            <Route path="/perfil" component={Profile}></Route>
            <Route path="/notificacao" component={Notification}></Route>
            <Route path="/configuracao" component={Settings}></Route>
            <Route path="/produto/:idProduct" component={ProductPage}></Route>
            <Route path="/buscaProduto/:busca" component={SearchPage}></Route>
            <Route path="/googleflow" component={Googleflow}></Route>
            <Route path="/facebookflow" component={Facebookflow}></Route>
            <Route path="/administrador" component={Administrador}></Route>
            <Route path="/agenda" component={AgendaEncomenda}></Route>
            <Route path="/cadastrarProduto" component={CadastrarProduto}></Route>
            <Route path="/controleEstoque" component={ControleEstoque}></Route>
            <Route path="/editarProduto" component={EditarProduto}></Route>
            <Route path="/excluirProduto" component={ExcluirProduto}></Route>
            <Route path="/relatorioEncomendas" component={RelatorioEncomendas}></Route>
        </BrowserRouter>
    );
}

export default Routes