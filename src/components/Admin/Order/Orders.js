import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from "./Order";
import { Table, Message, Menu } from "semantic-ui-react";
class Orders extends React.Component {
  state = { status: "" };
  handleItemClick = (e, { name }) => this.setState({ status: name });
  render() {
    const { status } = this.state;
    return (
      <>
      <Menu tabular>
          <Menu.Item
            name=""
            active={status === ""}
            onClick={this.handleItemClick}
          >
            ที่ต้องชำระ
          </Menu.Item>
          <Menu.Item
            name="successful"
            active={status === "successful"}
            onClick={this.handleItemClick}
          >
            ที่ต้องจัดส่ง
          </Menu.Item>
          <Menu.Item
            name="sended"
            active={status === "sended"}
            onClick={this.handleItemClick}
          >
            สำเร็จ
          </Menu.Item>
          <Menu.Item
            name="cancel"
            active={status === "cancel"}
            onClick={this.handleItemClick}
          >
            ยกเลิกแล้ว
          </Menu.Item>
        </Menu>
      <Table stackable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">Order list</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="1">Order Id</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">Order detail</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">Order total</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Query
            fetchPolicy="network-only"
            query={gql`
              query usersOrder($status: String) {
                usersOrder(status: $status) {
                  id
                  email
                  name
                  order {
                    id
                    createdAt
                    total
                    status
                  }
                }
              }
            `}
            variables={{ status }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      <Message compact>loading</Message>
                    </Table.Cell>
                  </Table.Row>
                );
              if (error)
                return (
                  <Table.Row>
                    <Table.Cell colSpan="6" textAlign="center">
                      <Message warning compact>
                        {error.message}
                      </Message>
                    </Table.Cell>
                  </Table.Row>
                );
              return data.usersOrder.map((currentOrder, i) =>
                currentOrder.order.map((thisOrder, y) => (
                  <Order
                    key={y}
                    order={thisOrder}
                    user={{
                      name: currentOrder.name,
                      email: currentOrder.email
                    }}
                  />
                ))
              );
            }}
          </Query>
        </Table.Body>
      </Table>
      </>
    );
  }
}
export default Orders;
