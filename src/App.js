import React from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch } from 'react-router-dom'
//import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Logout from './Logout';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Product from './components/Product/Products';
import Cart from './components/Cart/CartSummary';
import Checkout from './components/Checkout/Checkout';
import Home from './components/HomepageLayout';
import Inventory from './components/Inventory';
import Reload from './components/Reload';
import Wip from './components/Wip';
//admin comp
import Adnav from './components/Admin/Adnav/Adnav';
import Test from './components/Admin/Mutations/Mutations';
import AdOrder from './components/Admin/Order/Orders';
import AddProduct from './components/Admin/Product/AddProduct';
import RemoveProduct from './components/Admin/Product/RemoveProduct';
import ListProduct from './components/Admin/ListProduct/ListProducts';
const AUTH_TOKEN = 'auth-token'
//uri: 'https://sushingg-api.herokuapp.com/graphql',http://localhost:4000/graphql
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	request: async (operation) => {
		const token = localStorage.getItem(AUTH_TOKEN)
		operation.setContext({
		  headers: {
			'x-access-token': token
		  }
		});
	}
});

const App = () => (
  <ApolloProvider client={client}>
	<Inventory>
	<Switch>
		<Route path="/admin">
			<Adnav>
			<Switch>
				<Route path='/admin/login' component={Login} />
				<Route path='/admin/Order' component={AdOrder} />
				<Route path='/admin/addproduct' component={AddProduct} />
				<Route path='/admin/removeproduct/:id' component={RemoveProduct} />
				<Route path='/admin/listproduct' component={ListProduct} />
				<Route path='/admin/wip' component={Wip} />
				<Route path='/admin/test' component={Test} />
				<Route component={AdOrder}/>
			</Switch>
			</Adnav>
		</Route>
		<Home>
			<Route exact path='/login' component={Login} />
			<Route exact path="/" component={Products}/>
			<Route exact path="/cart" component={Cart}/>
			<Route exact path="/checkout" component={Checkout}/>
			<Route path="/reload" component={Reload}/>
			<Route path='/logout' component={Logout} />
			<Route path="/p/:slug" component={Product}/>
		</Home>
	</Switch>
	<Footer/>
	</Inventory>
  </ApolloProvider>

);

export default App;
