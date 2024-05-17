import React from 'react';
import Home from './components/core/Home';
import Shop from './components/core/Shop';
import Signin from './components/core/Signin';
import Signup from './components/core/Signup';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/admin/PrivateRoute';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";
import Product from "./components/core/Product";
import Cart from './components/core/Cart';
import Success from './components/core/Success';
import Orders from './components/core/Order';

const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/user/dashboard" component={Dashboard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
        <AdminRoute path="/admin/orders" component={Orders} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/success" component={Success}></Route>
      </Switch>
    </HashRouter>
  );
};

export default AppRoutes;
