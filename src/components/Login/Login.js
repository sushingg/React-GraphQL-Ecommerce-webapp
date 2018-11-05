import React from 'react';
import { Link } from "react-router-dom";
import './Login.css'
import LoginForm from './LoginForm'
import { Jumbotron, Button, Col, Row } from 'reactstrap';
class Login extends React.Component {
  render() {
	  return (
		<Jumbotron className="form-signin">
			<h2 className="text-center py-3">Sign in</h2>
			<LoginForm/>
		</Jumbotron>
		)
}};
export default Login;
