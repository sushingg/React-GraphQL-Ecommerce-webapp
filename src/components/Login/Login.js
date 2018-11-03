import React from 'react';
import { Link } from "react-router-dom";
import './Login.css'
import LoginForm from './LoginForm'
class Login extends React.Component {
  render() {
	  return (
	<section className="hero is-success is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">
					<div className="column is-4 is-offset-4">
						<h3 className="title has-text-grey">Login</h3>
						<p className="subtitle has-text-grey">Please login to proceed.</p>
						<div className="box">
							<figure className="avatar">
								<img src="https://placehold.it/128x128" alt=" "/>
							</figure>
							<LoginForm />
						</div>
						<p className="has-text-grey">
							<Link to="/#">Sign Up</Link> &nbsp;·&nbsp;
							<Link to="/#">Forgot Password</Link> &nbsp;·&nbsp;
							<Link to="/#">Need Help?</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
		)
}};
export default Login;
