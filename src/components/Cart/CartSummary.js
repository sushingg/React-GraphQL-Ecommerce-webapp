import React from "react";
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
                  style={{ minWidth: 500 }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width="ten">รายการ</Table.HeaderCell>
                      <Table.HeaderCell>ราคา</Table.HeaderCell>
                      <Table.HeaderCell>จำนวน</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cart.items.filter(onlyUnique).map((p, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Header as="h4" image>
                            {p.image.length ? (
                              <Image
                                rounded
                                size="small"
                                src={
                                  "https://sushingg-api.herokuapp.com/images/" +
                                  p.image[0].name
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
                              {p.title}{" "}
                              <Header.Subheader>
                                {p.description}{" "}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>{p.price} ฿</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>
                              {p.quantity+" " || "none"}ชิ้น
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Header as='h3' textAlign='right'>
                  รวม{" "}
                  {cart.items.reduce(
                    (acc, { price, quantity }) =>
                      acc + price * quantity,
                    0
                  ) || "0"}{" "}
                  บาท
                </Header>
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
