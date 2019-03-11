import React from 'react';
import { Redirect } from 'react-router'
import { CartContext } from "./components/CartContext";

const AUTH_TOKEN = 'auth-token'
const ClearCart =  props => {
  return ( 
      <CartContext.Consumer>
      {cart => (
        <div>
        {cart.onClearCart()}
        )
        </div>)
      }
      </CartContext.Consumer>
      
  )
}
export default ClearCart;
