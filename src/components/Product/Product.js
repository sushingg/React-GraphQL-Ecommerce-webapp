import React from 'react';

import {  Icon, Image } from 'semantic-ui-react'
import { CartContext } from "../CartContext";
import {
  Button,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'
const Product = (props) => {

	var { quantity } = 0
	quantity = 1
  return (
    <CartContext.Consumer>
    {cart => (

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column floated='left' width={6}>
        	<Image bordered rounded size='large' src={"/image/"+props.product.productSlug+"/"+props.product.productImage} />
            
          </Grid.Column>
          <Grid.Column  width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              {props.product.productTitle}
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              {props.product.productDescription}
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              ฿{props.product.productPrice}
            </Header>
			<div className="clearfix" >
				<div >
					<span>จำนวน: </span>
					<input id="quantity_input" className="form-control" type="number" pattern="[0-9]*" value={quantity}
					onChange={e => quantity = e.target.value}/>
				</div>
			</div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button primary size='huge' onClick={() => cart.onAddToCart(props.product)}>Add to Cart</Button><div className="product_fav"><Icon name='heart' /></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

	)}

	</CartContext.Consumer>
  );
};

export default Product;
