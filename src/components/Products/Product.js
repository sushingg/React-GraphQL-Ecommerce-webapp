import React from 'react';
import {  Link } from "react-router-dom";
import { CartContext } from "../CartContext";

import { Card, Image, Button, Icon } from 'semantic-ui-react'

const Product = (props) => {
  return (
  <CartContext.Consumer>
    {cart => (
      <Card key={props.product.productSlug} raised link className="shadow" >

        {props.product.productImage.length?
        (<Image className="productImg" wrapped as={Link} to={"p/"+props.product.productSlug}  src={"/image/"+props.product.productSlug+"/"+props.product.productImage[0].name} />)
        :(<Image className="productImg" wrapped as={Link} to={"p/"+props.product.productSlug}  src="/image/test.jpg" />)
        }
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
        <Button animated='vertical' color='blue'  onClick={() => cart.onAddToCart(props.product)}>
          <Button.Content visible>Add to Cart</Button.Content>
          <Button.Content hidden><Icon name='cart arrow down'/></Button.Content>
        </Button>
      </Card>    
    )}
  </CartContext.Consumer>
  );

};

export default Product;
