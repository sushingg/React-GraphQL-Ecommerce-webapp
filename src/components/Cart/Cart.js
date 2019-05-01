import React, { Component, useState } from "react";
import {
  Button,
  Container,
  Header,
  Divider,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import CartSummary from "./CartSummary";

const Cart = props => {
  const [visible, setVisible] = useState(false);

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
