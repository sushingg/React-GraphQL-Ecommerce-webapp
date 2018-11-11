import React from 'react';
import './Login.css'
import LoginForm from './LoginForm'
import { Jumbotron } from 'reactstrap';
class Login extends React.Component {
  render() {
	  return (
	  <div className="container-fluid h-100 bg-light ">
		<Jumbotron className="form-signin">
			<h2 className="text-center py-3">Sign in</h2>
			<LoginForm/>
		</Jumbotron>
	  </div>
		)
}};
export default Login;
