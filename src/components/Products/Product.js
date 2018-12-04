import React from 'react';
import {  Link } from "react-router-dom";
import { CartContext } from "../CartContext";

import { Card, Icon, Image } from 'semantic-ui-react'

const Product = (props) => {

  return (
  <CartContext.Consumer>
    {cart => (
      <Card key={props.product.productSlug} className="shadow" >
        <Image wrapped as={Link} to={"p/"+props.product.productSlug}  src={"/image/"+props.product.productSlug+"/"+props.product.productImage} />
        <Card.Content >
    
          <Card.Header>
          <Link  className="text-secondary" to={"p/"+props.product.productSlug}>
            {props.product.productTitle}
          </Link>
          </Card.Header>
          <Card.Meta>
            <span className='date'>{props.product.productPrice} ฿</span>
          </Card.Meta>
          <Card.Description>{props.product.productDescription}</Card.Description>
          <br/>
        </Card.Content>
        <button className="product_cart_button" onClick={() => cart.onAddToCart(props.product)}>Add to Cart</button>
      </Card>    
    )}
  </CartContext.Consumer>
  );

};

export default Product;
