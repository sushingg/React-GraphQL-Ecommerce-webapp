import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { Button, Form, Segment, Input, Label, Dropdown } from 'semantic-ui-react'
import { Alert } from 'reactstrap';
import { CartContext } from "../../CartContext";
import isLogin from '../../../common'

const REMOVE_PRODUCT_MUTATION = gql`
  mutation removeproduct($id:ID!)
    {
      removeProductById(
        id:$id
      ){
        id
        productSlug
      }
    }
`

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
class RemoveProduct extends Component {
    state = {
      showError: false,
      isLogged: false,

    }
    render() {
    const { id } = this.props.match.params
    const login = isLogin()
    if(login !== null){
      if(!this.state.isLogged)
      this.setState({  
        orderEmail: login.email ,
        orderFirstname: login.fname ,
        orderLastname: login.lname,
        isLogged: true 
      })
    }
    console.log(login)
    if(login == null){this.props.history.push(`/`)}
    const { errorMessage } = this.state
    return (
          <div>
          <Alert color="danger" isOpen={this.state.showError} toggle={this.onDismiss} >
            {errorMessage}
          </Alert>
            <Mutation
              mutation={REMOVE_PRODUCT_MUTATION}
              variables={{id}}
              onCompleted={data => this._confirm(data)}
              onError={error => this._error(error) }
            >
              {mutation => (
                <Button color='red' fluid size='large' onClick={mutation}>
                  Remove this product
                </Button>
              )}
            </Mutation>
            </div>
    )}
    
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
    const order  = data.removeProductById
    console.log(order)
    window.location = '/admin/listproduct'
  }
  _error = async error => {
    //alert(error);
    console.log(this.state.productTags)
    this.setState({errorMessage: error.message})
    this.toggleError()
  }
  _saveUserData = token => {
  //localStorage.setItem(AUTH_TOKEN, token)
  }
}


export default RemoveProduct;