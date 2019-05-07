import React, { Component } from "react";
import { CartContext } from "./CartContext";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("items") || "[]"),
      price:localStorage.getItem("price") || "[]",
      itemSum:localStorage.getItem("itemSum") || "[]",
    };
    this.pitem = [];
  }
  updatesum(){
    this.setState({
      price: this.state.items.reduce(
        (acc, { productPrice, quantity }) =>
          acc + productPrice * quantity,
        0
      ) || "0",
      itemSum: this.state.items.reduce(
        (acc, {  quantity }) =>
          acc + quantity,
        0
      ) || "0",
    });
    localStorage.setItem("price", this.state.price);
    localStorage.setItem("itemSum", this.state.itemSum);
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
    this.updatesum();
  }
  onSetCartValue = this.onSetCartValue.bind(this);
  async onSetCartValue(p,value) {
    const index = this.state.items.findIndex(function(object) {
      return object.productSlug === p.productSlug;
    });
    value = parseInt(value, 10)
    if(!value || value == 0){value = 1}
    console.log(value)
    
    if (index >= 0) {
      var newArray = [...this.state.items];
      newArray[index].quantity = value;
      this.setState({
        items: newArray
      });
    }
    this.pitem = JSON.parse(localStorage.getItem("items") || "[]");
    this.pitem = [...this.pitem, p];
    await localStorage.setItem("items", JSON.stringify(this.state.items));
    this.updatesum();
  }
  onDeleteFromCart = this.onDeleteFromCart.bind(this);
  async onDeleteFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.productSlug === p.productSlug;
    });
    var newArray = [...this.state.items];
      newArray.splice(index, 1);
      this.setState({
        items: newArray
      });
    await localStorage.setItem("items", JSON.stringify(newArray));
    await this.updatesum();
  }
  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  async onRemoveFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.productSlug === p.productSlug;
    });
    var newArray = [...this.state.items];
    if (this.state.items[index].quantity > 1) {
      newArray[index].quantity -= 1;
      this.setState({
        items: newArray
      });
      console.log("decress");
    } else {
      newArray.splice(index, 1);
      this.setState({
        items: newArray
      });
      console.log("remove");
    }
    
    /*const newArray = [...this.state.items];
    newArray.splice(i, 1);
    this.setState({
      items: newArray
    });*/
    await localStorage.setItem("items", JSON.stringify(newArray));
    console.log(this.state.items);
    await this.updatesum();
  }
  onClearCart = this.onClearCart.bind(this);
  onClearCart() {
    this.setState({
      items: []
    });
    localStorage.setItem("items", []);
    localStorage.setItem("price", 0);
    localStorage.setItem("itemSum", 0);
    this.updatesum();
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          items: this.state.items,
          price: this.state.price,
          itemSum: this.state.itemSum,
          onAddToCart: this.onAddToCart,
          onRemoveFromCart: this.onRemoveFromCart,
          onDeleteFromCart:this.onDeleteFromCart,
          onSetCartValue: this.onSetCartValue,
          onEditCartItem: this.onEditCartItem,
          onEditCart: this.onEditCart,
          onClearCart: this.onClearCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default Inventory;
