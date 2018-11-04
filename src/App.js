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
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	request: async (operation) => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmQ3NjRhYTcwMzgzMDA2ZDQxMTA5Y2QiLCJlbWFpbCI6InNoaW5Ac2hpbi5jaCIsImFkbWluIjp0cnVlLCJleHAiOjE1NDk5MjYxODksImlhdCI6MTU0MDkyMjU4OX0.Up-ku3Hnf6YVoGc2xumP-ax88yBgm6yLN0YGRFwk9uIss'// null
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
		<div className="container is-widescreen is-centered py-5 bg-light">
			<div className="section">
				<div className="row columns is-multiline">
					<Route exact path="/" component={Products}/>
				</div>
			</div>
		</div>
	<Route path='/logout' component={Logout} />
  <Footer/>
	</ApolloProvider>

);

export default App;
