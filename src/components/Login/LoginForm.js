import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
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
  }

  render() {
    const { login, email, password, name, lname } = this.state
    return (
      <div>
        <div className="column">
          {!login && (
	<div className="field">
		<div className="field">
			<div className="control">
			<input className="input is-large"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="First name"
            />
			</div>
		</div>
		<div className="field">
			<div className="control">
			<input className="input is-large"
              value={lname}
              onChange={e => this.setState({ lname: e.target.value })}
              type="text"
              placeholder="Last name"
            />
			</div>
		</div>
	</div>
          )}
		<div className="field">
			<div className="control">
			  <input className="input is-large"
				value={email}
				onChange={e => this.setState({ email: e.target.value })}
				type="text"
				placeholder="Your Email"
			  />
			</div>
		</div>
		<div className="field">
			<div className="control">
			  <input className="input is-large"
				value={password}
				onChange={e => this.setState({ password: e.target.value })}
				type="password"
				placeholder="Your Password"
			  />
			</div>
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
			<div className="field">
				<div className="control">
				  <div className="button is-block is-info is-large is-fullwidth" onClick={mutation}>
					{login ? 'login' : 'create account'}
				  </div>
				</div>
			</div>
			)}
		  </Mutation>
			<div className="field">
			<div className="control">
			  <div
				className="button is-block is-info is-large is-fullwidth"
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

	_confirm = async data => {
	  const { token } = this.state.login ? data.login : data.addUser
	  this._saveUserData(token)
	  this.props.history.push(`/`)
	}
	_error = async error => {
		alert(error);
	}
	_saveUserData = token => {
	localStorage.setItem(AUTH_TOKEN, token)
	}
}

export default withRouter(Login);
