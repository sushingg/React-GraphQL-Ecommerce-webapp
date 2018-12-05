import React from 'react';
import { Redirect } from 'react-router'
import { CartContext } from "./components/CartContext";

const AUTH_TOKEN = 'auth-token'
const Logout =  props => {
	localStorage.removeItem(AUTH_TOKEN)
	localStorage.clear();
  return ( 
      <CartContext.Consumer>
      {cart => (
        <div>
        {cart.onClearCart()}
        <Redirect to="/"/>)
        </div>)
      }
      
      </CartContext.Consumer>
      
  )
}
export default Logout;
