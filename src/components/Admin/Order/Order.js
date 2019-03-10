import React from 'react';
import {  Link } from "react-router-dom";
import { Card, Image,Table,Icon } from 'semantic-ui-react'

const Product = (props) => {

  return (
    <Table.Row>
        <Table.Cell collapsing>
          <Icon name='file outline' />View Order
        </Table.Cell>
        <Table.Cell>{'Date: '+props.order.orderDate+'| Email: '+props.order.orderEmail+'| orderFirstname: '+props.order.orderFirstname}</Table.Cell>
        <Table.Cell>{props.order.orderTotal+' ฿'}</Table.Cell>
        <Table.Cell collapsing textAlign='right'>
          {'Status: '+props.order.orderStatus}
        </Table.Cell>
    </Table.Row>
  );

};

export default Product;
