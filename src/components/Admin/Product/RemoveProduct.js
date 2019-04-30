import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { Button, Segment, Message } from 'semantic-ui-react'
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

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
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
          {this.state.showError&&(<Segment basic textAlign="center"><Message warning onDismiss={(e) => this.setState({showError: false})} compact>{errorMessage}</Message></Segment>)}
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