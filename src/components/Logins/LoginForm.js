import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Login.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		email: '',
		password:''
	};

    this.handleChange = this.handleChange.bind(this);
	this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }
	handleChange2(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
	<div>
		<form  onSubmit={this.handleSubmit}>
			<div className="field">
				<div className="control">
					<input className="input is-large" type="email" placeholder="Your Email" autoFocus="" value={this.state.email} onChange={this.handleChange}/>
				</div>
			</div>

			<div className="field">
				<div className="control">
					<input className="input is-large" type="password" placeholder="Your Password" value={this.state.password} onChange={this.handleChange2}/>
				</div>
			</div>
			<div className="field">
				<label className="checkbox">
				<input type="checkbox"/>
					Remember me
				</label>
			</div>
			<button className="button is-block is-info is-large is-fullwidth">Login</button>
		</form>
		</div>
    );
  }
}
export default LoginForm;	