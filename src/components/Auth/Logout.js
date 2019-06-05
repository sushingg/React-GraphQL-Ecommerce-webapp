import React from 'react';
import { Redirect } from 'react-router'
import { CartContext } from "../CartContext";

const Logout =  props => {
  let loggedout = false
  const logout =  cart => {
    if(!loggedout){
      loggedout = true
      cart.onLogout()
      return <Redirect to="/"/>
    }
  }
  return ( 
      <CartContext.Consumer>
      {cart => (
        <>
        {logout(cart)}
        </>)
      }      
      </CartContext.Consumer>      
  )
}

export default Logout;
