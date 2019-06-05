import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { withRouter } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


const AUTH_TOKEN = 'auth-token'
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!,$name:String!,$mno:String!) {
    addUser(email: $email, password: $password,name:$name,mobileNumber:$mno) {
      token
    }
}
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
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
  	mno: '',
  	showError: false
  }

  render() {
    const { login, email, password, name, mno, errorMessage} = this.state
    return (
  <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
       
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450,minWidth:350 }}>
        <Header as='h2' color='blue' textAlign='center'>
           {login ? 'Log-in to your account' : ' Sign Up your account'}
        </Header>
        {this.state.showError&&(<Segment basic textAlign="center"><Message warning onDismiss={(e) => this.setState({showError: false})} compact>{errorMessage}</Message></Segment>)}
        <Form size='large'>
          <Segment stacked>
          {!login && (
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              value={name}
              placeholder='User Name' 
              onChange={e => this.setState({ name: e.target.value })}
            />
          )}
          {!login && (
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              value={mno}
              placeholder='mobile' 
              onChange={e => this.setState({ mno: e.target.value })}
            />

          )}
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              value={email}
              placeholder='E-mail address' 
              onChange={e => this.setState({ email: e.target.value })}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={password}
              type='password'
              onChange={e => this.setState({ password: e.target.value })}
            />
      			<Mutation
      				mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
      				variables={{ email, password, name, mno }}
      				onCompleted={data => this._confirm(data)}
      				onError={error => this._error(error) }
      			>
      			  {(mutation, { loading }) =>(
                <Button color='blue' loading={loading?true:null} fluid size='large' onClick={mutation}>
                  {login ? 'Login' : 'Sign Up'}
                </Button>
              )}
            </Mutation>
          </Segment>
        </Form>
        <Message>
          <a href='/#' onClick={() => this.setState({ login: !login })}>{login ? 'need to create an account?' : 'already have an account?'}</a>
        </Message>

      
      </Grid.Column>
    </Grid>
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
	  const { token } = this.state.login ? data.loginUser : data.addUser
    this._saveUserData(token)
	  localStorage.setItem(AUTH_TOKEN, token)
	}
	_error = async error => {
		//alert(error);
    console.log(error.graphQLErrors)

		this.setState({errorMessage: error.message})
		this.toggleError()
	}
	_saveUserData = token => {
	  this.props.history.push(`/dologin`)
	}
}

export default withRouter(Login);