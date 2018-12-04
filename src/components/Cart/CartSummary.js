import React from "react";
import { CartContext } from "../CartContext";
import {  Table , Icon, Image, Header } from 'semantic-ui-react'
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

export default props => (
  <div>
    <CartContext.Consumer>
      {cart => (
        <div>
          <h4>{cart.items.length || 'No'} items in cart</h4>

            
      <Table basic='very' celled striped unstackable style={{ minWidth:450 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='ten'>รายการ</Table.HeaderCell>
            <Table.HeaderCell>ราคา/จำนวน</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {cart.items.filter(onlyUnique).map((p, i) => (
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Image src={"/image/"+p.productSlug+"/"+p.productImage}  rounded size='mini' />
                <Header.Content>
                  {p.productTitle}{" "}
                  <Header.Subheader>{p.productDescription}{" "}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  {p.productPrice}{" "} ฿
                  <Header.Subheader>{cart.items.filter(pc => pc.productSlug === p.productSlug).length || 'none'}ชิ้น</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Icon name='plus' color='green' onClick={() => cart.onAddToCart(p)}/><br/>
              <Icon name='minus'  color='red' onClick={() => cart.onRemoveFromCart(i)} />
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
        <h4>รวม { cart.items.reduce((acc, { productPrice }) => acc + productPrice, 0) || '0'} บาท</h4>
      </div>
      )}
    </CartContext.Consumer>
  </div>
);
