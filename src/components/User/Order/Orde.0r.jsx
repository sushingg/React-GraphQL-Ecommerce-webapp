// https://www.npmjs.com/package/react-responsive-carousel
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Grid,
  Image,
  Segment,
  Divider
} from "semantic-ui-react";
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2
  })
const Order = props => {
  return (
    <Segment basic textAlign="center">
      <Divider horizontal>
        <Header as="h3">
          <Icon name="ordered list" />
          รายการสั่งซื้อของคุณคือ #{props.order.id}
        </Header>
      </Divider>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Header>
              <Icon name="calendar alternate outline" />
              ชำระเงินค่าสินค้าภายใน
            </Header>
            <Header> 
            {moment.unix((props.order.createdAt)/1000).add(1, 'd').format("llll")}
              <Header.Subheader>กรุณาชำระเงินก่อนเวลา</Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header>
              <Icon name="money bill alternate outline" />
              จำนวนเงินที่ต้องชำระ
            </Header>
            <Header>{formatter.format(props.order.total)} บาท</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>สถานะรายการสั่งซื้อ</Header>
            <Header>
              รอชำระเงิน
              <Header.Subheader>กรุณาชำระเงิน</Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}> 
            <Button fluid color="blue">
              ชำระเงิน
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default Order
// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
