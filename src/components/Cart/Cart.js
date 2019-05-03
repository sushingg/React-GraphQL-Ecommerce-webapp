import React from "react";
import {
  Container,
  Header,
  Divider,
  Segment,
} from "semantic-ui-react";
import CartSummary from "./CartSummary";

const Cart = props => {
  return (
    <>
      <Container style={{ padding: "3em 0em" }}>
        <Segment>
          <Header as='h3'>Cart | รถเข็น</Header>
          <Divider />
          <CartSummary />
        </Segment>
      </Container>
    </>
  );
};
export default Cart;
