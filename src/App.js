import React from 'react';

import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Logout from './Logout';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';

const AUTH_TOKEN = 'auth-token'
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
	<Navbar/>
	<Route exact path='/login' component={Login} />
	<Route exact path="/" component={Products}/>
	<Route path='/logout' component={Logout} />
	<Footer/>
  </ApolloProvider>

);

export default App;
