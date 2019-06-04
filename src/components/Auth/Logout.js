import React from 'react';
import { Redirect } from 'react-router'
import { CartContext } from "../CartContext";

const AUTH_TOKEN = 'auth-token'

const Logout =  props => {
  let loggedout = false
  const logout =  cart => {
    if(!loggedout){
      loggedout = true
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.clear()
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
