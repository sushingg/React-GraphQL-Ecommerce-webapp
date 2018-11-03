import React from 'react';
import { Redirect } from 'react-router'

const AUTH_TOKEN = 'auth-token'
const Logout =  props => {
	localStorage.removeItem(AUTH_TOKEN)
	localStorage.clear();
	alert('logout');
  return ( 
      <Redirect to="/"/>
  )
}
export default Logout;
