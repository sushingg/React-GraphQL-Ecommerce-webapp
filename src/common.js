//import React from 'react';
//import { Redirect } from 'react-router'
import jwtDecode from 'jwt-decode'
const AUTH_TOKEN = 'auth-token'
const isLogin =  props => {
  const token = localStorage.getItem(AUTH_TOKEN)
  var res=''
  if(token !== null)
  {
    var decoded = jwtDecode(token);
    res = decoded
    console.log(decoded)
  }
  else{
     res = null
  }
  return res
}
export default isLogin;
