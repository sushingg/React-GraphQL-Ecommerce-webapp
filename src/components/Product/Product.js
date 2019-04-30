import React from "react";
import { Icon, Image, Container } from "semantic-ui-react";
import { CartContext } from "../CartContext";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
var Carousel = require("react-responsive-carousel").Carousel;
const Product = props => {
  var { quantity } = 0;
  quantity = 1;
  return (
    <>
      <CartContext.Consumer>
        {cart => (
          <Segment secondary style={{ padding: "5em 0em" }} vertical>
            <Container>
              <Segment padded>
                <Grid container stackable verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column floated="left" width={6}>
                      {!props.product.productImage.length && (
                        <Image
                          bordered
                          rounded
                          size="large"
                          src="/image/test.jpg"
                        />
                      )}
                      <Carousel
                        showArrows={true}
                        showThumbs={true}
                        infiniteLoop={true}
                        autoPlay={true}
                        emulateTouch={true}
                      >
                        {props.product.productImage.map((keyName, i) => (
                          <div key={i}>
                            <img
                              alt="slider"
                              src={
                                "/image/" +
                                props.product.productSlug +
                                "/" +
                                props.product.productImage[i].name
                              }
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header as="h3" style={{ fontSize: "2em" }}>
                        {props.product.productTitle}
                      </Header>
                      <p style={{ fontSize: "1.33em" }}>
                        {props.product.productDescription}
                      </p>
                      <Header as="h3" style={{ fontSize: "2em" }}>
                        ฿{props.product.productPrice}
                      </Header>
                      <div className="clearfix">
                        <div>
                          <span>จำนวน: </span>
                          <input
                            id="quantity_input"
                            className="form-control"
                            type="number"
                            pattern="[0-9]*"
                            value={quantity}
                            onChange={e => (quantity = e.target.value)}
                          />
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column textAlign="center">
                      <Button
                        primary
                        size="huge"
                        onClick={() => cart.onAddToCart(props.product)}
                      >
                        Add to Cart
                      </Button>
                      <div className="product_fav">
                        <Icon name="heart" />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
          </Segment>
        )}
      </CartContext.Consumer>
    </>
  );
};

export default Product;
