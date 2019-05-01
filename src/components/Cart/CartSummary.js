import React, { useState } from "react";
import { CartContext } from "../CartContext";
import { Table, Icon, Image, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const CartSum = props => {
  return (
    <>
      <CartContext.Consumer>
        {cart => (
          <div>
            {cart.items.length ? (
              <Segment basic>
                <Table
                  basic="very"
                  celled
                  striped
                  unstackable
                  style={{ minWidth: 450 }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width="ten">รายการ</Table.HeaderCell>
                      <Table.HeaderCell>ราคา/จำนวน</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cart.items.filter(onlyUnique).map((p, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Header as="h4" image>
                            {p.productImage.length ? (
                              <Image
                                rounded
                                size="mini"
                                src={
                                  "/image/" +
                                  p.productSlug +
                                  "/" +
                                  p.productImage[0].name
                                }
                              />
                            ) : (
                              <Image
                                rounded
                                size="mini"
                                src="/image/test.jpg"
                              />
                            )}
                            <Header.Content>
                              {p.productTitle}{" "}
                              <Header.Subheader>
                                {p.productDescription}{" "}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>
                              {p.productPrice} ฿
                              <Header.Subheader>
                                {p.quantity || "none"}ชิ้น
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Icon
                            name="plus"
                            color="green"
                            onClick={() => cart.onAddToCart(p)}
                          />

                          <br />
                          <Icon
                            name="minus"
                            color="red"
                            onClick={() => cart.onRemoveFromCart(p)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <h4>
                  รวม{" "}
                  {cart.items.reduce(
                    (acc, { productPrice, quantity }) =>
                      acc + productPrice * quantity,
                    0
                  ) || "0"}{" "}
                  บาท
                </h4>
              </Segment>
            ) : (
              <Segment placeholder>
                <Header icon>
                  <Icon name="cart" />
                  ไม่มีสินค้าในรถเข็นของคุณ
                  <Header.Content>
                    <Link to="/">เลือกซื้อสินค้า</Link>
                  </Header.Content>
                </Header>
              </Segment>
            )}
          </div>
        )}
      </CartContext.Consumer>
    </>
  );
};
export default CartSum;
