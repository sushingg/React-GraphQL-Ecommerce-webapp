import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Segment, Message } from 'semantic-ui-react'
const AUTH_TOKEN = 'auth-token'
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!,$name:String!,$lname:String!) {
    addUser(email: $email, password: $password,firstName:$name,lastName:$lname) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
 
class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
	lanme: '',
	showError: false
  }

  render() {
    const { login, email, password, name, lname, errorMessage} = this.state
    return (
	<div>
		{this.state.showError&&(<Segment basic textAlign="center"><Message warning onDismiss={(e) => this.setState({showError: false})} compact>{errorMessage}</Message></Segment>)}
        <div className="column">
          {!login && (
		<div className="field">
			<div className="form-label-group">
				<input 
					type="text" id="inputName" value={name} 
					className="form-control" placeholder="First Name" 
					required="" autofocus=""
					onChange={e => this.setState({ name: e.target.value })}
				/>
				<label htmlFor="inputName">First Name</label>
			</div>
			<div className="form-label-group">
				<input 
					type="text" id="inputLname" value={lname} 
					className="form-control" placeholder="Last Name" 
					required="" autofocus=""
					onChange={e => this.setState({ lname: e.target.value })}
				/>
				<label htmlFor="inputLname">Last Name</label>
			</div>
		</div>
          )}
		<div className="form-label-group">
			<input 
				type="email" id="inputEmail" value={email} 
				className="form-control" placeholder="Email address" 
				required="" autoFocus=""
				onChange={e => this.setState({ email: e.target.value })}
			/>
			<label htmlFor="inputEmail">Email address</label>
		</div>
		<div className="form-label-group">
			<input 
				type="password" id="inputPassword" value={password}
				className="form-control" placeholder="Password" 
				required=""
				onChange={e => this.setState({ password: e.target.value })}
			/>
			<label htmlFor="inputPassword">Password</label>
		</div>
	</div>
		<div className="column">
			<br/>
			<Mutation
				mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
				variables={{ email, password, name, lname }}
				onCompleted={data => this._confirm(data)}
				onError={error => this._error(error) }
			>
			{mutation => (
				<div className="field py-2">
					<div className="control">
					  <div className="btn btn-lg btn-primary btn-block" onClick={mutation}>
						{login ? 'login' : 'create account'}
					  </div>
					</div>
				</div>
				)}
			</Mutation>
			<div className="field py-2">
				<div className="control">
					<div
						className="btn btn-lg btn-primary btn-block"
						onClick={() => this.setState({ login: !login })}
					  >
						{login ? 'need to create an account?' : 'already have an account?'}
					</div>
				</div>
			</div>
		</div>
	</div>
    )
  }
	toggleError = () => {
		this.setState((prevState, props) => {
		  return { showError: true }
		})
	};
	onDismiss = () => {
		this.setState((prevState, props) => {
		  return { showError: false }
		})
	};
	_confirm = async data => {
	  const { token } = this.state.login ? data.login : data.addUser
	  this._saveUserData(token)
	  this.props.history.push(`/`)
	}
	_error = async error => {
		//alert(error);
		this.setState({errorMessage: error.message})
		this.toggleError()
	}
	_saveUserData = token => {
	localStorage.setItem(AUTH_TOKEN, token)
	}
}

export default withRouter(Login);
