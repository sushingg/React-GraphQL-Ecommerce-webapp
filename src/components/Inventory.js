import React, { Component } from "react";
import { CartContext } from "./CartContext";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("items") || "[]")
    };
    this.pitem = [];
  }

  onAddToCart = this.onAddToCart.bind(this);
  async onAddToCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.productSlug === p.productSlug;
    });
    if (index >= 0) {
      var newArray = [...this.state.items];
      newArray[index].quantity += 1;
      this.setState({
        items: newArray
      });
    } else {
      p.quantity = 1;
      await this.setState({
        items: [...this.state.items, p]
      });
    }
    this.pitem = JSON.parse(localStorage.getItem("items") || "[]");
    this.pitem = [...this.pitem, p];
    await localStorage.setItem("items", JSON.stringify(this.state.items));
    console.log(p);
    //console.log(this.state.items)
  }

  
  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  onRemoveFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.productSlug === p.productSlug;
    });
    if (this.state.items[index].quantity > 1) {
      var newArray = [...this.state.items];
      newArray[index].quantity -= 1;
      this.setState({
        items: newArray
      });
      console.log('decress')
    } else {
      var newArray = [...this.state.items];
      newArray.splice(index, 1);
      this.setState({
        items: newArray
      });
      console.log('remove')
    }
    console.log(this.state.items)
    /*const newArray = [...this.state.items];
    newArray.splice(i, 1);
    this.setState({
      items: newArray
    });*/
    localStorage.setItem("items", JSON.stringify(newArray));
  }
  onClearCart = this.onClearCart.bind(this);
  onClearCart() {
    this.setState({
      items: []
    });
    localStorage.setItem("items", []);
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          items: this.state.items,
          onAddToCart: this.onAddToCart,
          onRemoveFromCart: this.onRemoveFromCart,
          onEditCartItem: this.onEditCartItem,
          onEditCart:this.onEditCart,
          onClearCart: this.onClearCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Inventory;
