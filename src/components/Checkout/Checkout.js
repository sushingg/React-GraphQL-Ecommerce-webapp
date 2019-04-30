import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { CartContext } from "../CartContext";
import isLogin from '../../common'

import Cart from '../Cart/CartSummary'

const ADD_ORDER_MUTATION = gql`
  mutation OrderMutation($orderEmail: String!, $orderFirstname: String!, $orderLastname:String!, $orderAddr1:String!, $orderTotal:Int!,$orderProducts:[orderProductInput]!) {
 	addOrder(orderEmail: $orderEmail, orderFirstname: $orderFirstname, orderLastname: $orderLastname, orderAddr1: $orderAddr1,orderTotal: $orderTotal,orderProducts: $orderProducts ) {
		orderPaymentLink
    }
  }
`

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
class Checkout extends Component {
    state = {
        orderEmail: '',
        orderAddr1: '',
        orderFirstname: '',
    	orderLastname: '',
    	showError: false,
      isLogged: false
    }
    render() {
    const login = isLogin()
    if(login !== null){
      if(!this.state.isLogged)
      this.setState({  orderEmail: login.email ,
                  orderFirstname: login.fname ,
                  orderLastname: login.lname,
                  isLogged: true })
    }
    const {  orderEmail, orderAddr1, orderFirstname, orderLastname, errorMessage} = this.state
    var items = JSON.parse(localStorage.getItem('items')|| "[]")
    if(items !== null){
      var orderTotal = items.reduce((acc, { productPrice }) => acc + productPrice, 0)||''
      var orderProducts = items.filter(onlyUnique).map((p) => {
        delete p.__typename
        delete p.productDescription
        delete p.productTags
        delete p.productAddedDate
        delete p.productImage
        delete p.__typename
        return p
      })
    }
    return (
        <CartContext.Consumer>
          {cart => (
          <div>
          {this.state.showError&&(<Segment basic textAlign="center"><Message warning onDismiss={(e) => this.setState({showError: false})} compact>{errorMessage}</Message></Segment>)}

        <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
        
              <Grid.Column floated='left' width={6}>
                <Cart/>
            </Grid.Column>
            <Grid.Column  width={8}>
            
                <Form size='large' >
                  <Segment >
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderFirstname}
                      placeholder='First Name' 
                      onChange={e => this.setState({ orderFirstname: e.target.value })}
                    />
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderLastname}
                      placeholder='Last Name' 
                      onChange={e => this.setState({ orderLastname: e.target.value })}
                    />
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderAddr1}
                      placeholder='Address' 
                      onChange={e => this.setState({ orderAddr1: e.target.value })}
                    />
        
              			<Mutation
              				mutation={ADD_ORDER_MUTATION}
              				variables={{ orderEmail, orderFirstname, orderLastname, orderAddr1, orderTotal, orderProducts}}
              				onCompleted={data => this._confirm(data) }
              				onError={error => this._error(error) }
              			>
              			  {mutation => (
                        <Button color='blue' fluid size='large' onClick={mutation}>
                          Checkout
                        </Button>
                      )}
                    </Mutation>
                  </Segment>
                </Form>
                </Grid.Column>
                 </Grid.Row>
      </Grid>
            </div>
              )}
        </CartContext.Consumer>
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
	  const order  = data.addOrder
	  console.log(order)
    localStorage.setItem("items", [])
	  window.location = order.orderPaymentLink
	}
	_error = async error => {
		//alert(error);
		this.setState({errorMessage: error.message})
		this.toggleError()
	}
	_saveUserData = token => {
	//localStorage.setItem(AUTH_TOKEN, token)
	}
}


export default Checkout;