import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch } from "react-router-dom";

import jwtDecode from "jwt-decode";

//import Navbar from './components/Navbar/Navbar';
import LoginLanded from "./components/Login/LoginLanded";
//
import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Footer from "./components/Footer/Footer";
//
import Products from "./components/Products/Products";
import Product from "./components/Product/Products";
import AllCategory from "./components/AllCategory/AllCategory";
//
import Cart from "./components/Cart/Cart";
import Checkout from "./components/User/Checkout/Checkout";

import Home from "./components/HomepageLayout";
import Inventory from "./components/Inventory";
import Reload from "./components/Reload";
import Wip from "./components/Wip";
import P404 from "./components/P404";
import Editor from "./components/Editor/Editor";
//admin comp
import Adnav from "./components/Admin/Adnav/Adnav";
import Test from "./components/Admin/Mutations/Mutations";
import AdOrder from "./components/Admin/Order/Orders";
import AddProducts from "./components/Admin/Product/AddProducts";
import RemoveProduct from "./components/Admin/Product/RemoveProduct";
import ListProduct from "./components/Admin/ListProduct/ListProducts";
import Dash from "./components/Admin/Dash/Dash";
const AUTH_TOKEN = "auth-token";

let token 
//uri:    https://sushingg-api.herokuapp.com/graphql
//        http://localhost:4000/graphql
const checklogin = () => {
  let res = null
  token = localStorage.getItem(AUTH_TOKEN)||null

  if (token !== null) {
    var decoded = jwtDecode(token);
    res = decoded;
    console.log(token)
    if (Date.now() / 1000 > res.exp) {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.clear();
      console.log("Oh, you have a key, but it's expired! ")
    }
  }else{
    console.log("You don't have a key? Why don't you ask that gentleman there? Go on then")
  }
  
  return res
}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: async operation => {
    if (checklogin()) {
      operation.setContext({
        headers: {
          Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
        }
      });
    }
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <Inventory>
      <Switch>
        <Route path="/admin">
          <Adnav>
            <Switch>
              <Route path="/admin/login" component={LoginLanded} />
              <Route path="/admin/Order" component={AdOrder} />
              <Route path="/admin/addproduct" component={AddProducts} />
              <Route
                path="/admin/removeproduct/:id"
                component={RemoveProduct}
              />
              <Route path="/admin/listproduct" component={ListProduct} />
              <Route path="/admin/wip" component={Wip} />
              <Route path="/admin/test" component={Test} />
              <Route component={Dash} />
            </Switch>
          </Adnav>
        </Route>
        <Route path="/logout" component={Logout} />
        <Home>
          <Switch>
            <Route exact path="/login" component={LoginLanded} />
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/c/:category?/:subCategory?" component={AllCategory} />     
            <Route path="/reload" component={Reload} />
            <Route path="/dologin" component={Login} />
            <Route path="/p/:slug" component={Product} />
            <Route exact path="/editor" component={Editor} />
            <Route component={P404} />
          </Switch>
        </Home>
      </Switch>
      <Footer />
    </Inventory>
  </ApolloProvider>
);

export default App;
