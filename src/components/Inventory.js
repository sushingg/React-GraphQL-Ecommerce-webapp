import React, { Component } from "react";
import { CartContext } from "./CartContext";

class Inventory extends Component {
  	constructor(props) {
		super(props);
		this.state = {
      items:  JSON.parse(localStorage.getItem('items') || "[]")
		};
		this.pitem = []
	}
  

  onAddToCart = this.onAddToCart.bind(this);
  onAddToCart(p){
   // if (this.state.items.find(function(pd,i) {  return pd.productSlug = p.productSlug})){ 
   //   this.state.item.i.value+1
   // }else{
   //   p.value =1
    //}

    this.setState({
      items: [...this.state.items, p]
    })
    this.pitem = JSON.parse(localStorage.getItem('items') || "[]")
    this.pitem = [...this.pitem, p]
    localStorage.setItem('items', JSON.stringify(this.pitem))
    console.log(p)
	  //console.log(this.state.items)
  }

  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  onRemoveFromCart(i) {
    const newArray = [...this.state.items];
    newArray.splice(i, 1);
    
    this.setState({
      items: newArray
    });
    localStorage.setItem('items', JSON.stringify(newArray))
  }

  render() {
    return (
	
      <CartContext.Provider
        value={{ 
          items: this.state.items,
          onAddToCart: this.onAddToCart,
          onRemoveFromCart: this.onRemoveFromCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Inventory;
