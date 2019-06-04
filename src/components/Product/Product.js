import React from "react";
import { Icon, Image, Container } from "semantic-ui-react";
import { CartContext } from "../CartContext";
import {
  Button,
  Grid,
  Header,
  Segment,
  Rating,
  Input,
  Breadcrumb,
  Divider
} from "semantic-ui-react";
var Carousel = require("react-responsive-carousel").Carousel;
var HtmlToReactParser = require("html-to-react").Parser;
var htmlToReactParser = new HtmlToReactParser();
const Product = props => {
  var { quantity } = 0;
  quantity = 1;

  return (
    <>
      <CartContext.Consumer>
        {cart => (
          <Segment secondary style={{ padding: "3em 0em" }} vertical>
            <Container>
              <Breadcrumb>
                <Breadcrumb.Section link>{props.product.category}</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link>{props.product.subCategory}</Breadcrumb.Section>
                <Breadcrumb.Divider />

                <Breadcrumb.Section active>
                  {props.product.title}
                </Breadcrumb.Section>
              </Breadcrumb>
              <Segment padded>
                <Grid container stackable>
                  <Grid.Row>
                    <Grid.Column floated="left" width={6}>
                      {!props.product.image.length && (
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
                        {props.product.image.map((keyName, i) => (
                          <div key={i}>
                            <img
                              alt="slider"
                              src={
                                "/image/" +
                                props.product.slug +
                                "/" +
                                props.product.image[i].name
                              }
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header as="h2">{props.product.title}</Header>
                      ## ขายแล้ว |{" "}
                      <Rating maxRating={5} defaultRating={3} icon="star" /> |
                      ## ผู้ให้คะแนน
                      <div style={{ padding: "3em 0em" }} />
                      <Header as="h2">฿{props.product.price}</Header>
                      <div>
                        <span>จำนวน: </span>
                        <Button basic attached="left">
                          <Icon name="minus" />
                        </Button>
                        <Input
                          id="quantity_input"
                          value={quantity}
                          onChange={e => (quantity = e.target.value)}
                        />
                        <Button basic attached="right">
                          &nbsp;
                          <Icon name="plus" />
                        </Button>
                      </div>
                      <br />
                      <Segment basic textAlign="center">
                        <Button
                          animated="fade"
                          fluid
                          primary
                          size="huge"
                          onClick={() => cart.onAddToCart(props.product)}
                        >
                          <Button.Content visible>Add to Cart</Button.Content>
                          <Button.Content hidden>
                            เพื่มไปยังรถเข็น
                          </Button.Content>
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <br />
              <Segment padded>
                <Header as="h2">รายละเอียดสินค้า</Header>
                <Divider />
                {htmlToReactParser.parse(props.product.descriptionHtml)}
              </Segment>
            </Container>
          </Segment>
        )}
      </CartContext.Consumer>
    </>
  );
};

export default Product;
