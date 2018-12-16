import React, { Component } from 'react'



class Reload extends Component {
  state = { }
  render() {
    console.log('Reloading')
    this.props.history.goBack()
    return (
        <p>reload</p>
    )}
    
}


export default Reload;