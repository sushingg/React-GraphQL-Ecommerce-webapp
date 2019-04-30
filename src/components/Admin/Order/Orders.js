import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from "./Order";
import { Table, Message } from "semantic-ui-react";
const Products = () => (
  <Table stackable padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="4">Order list</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell colSpan="1">#</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Order detail</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Order total</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Query
        query={gql`
          {
            users {
              order {
                id
                orderDate
                orderEmail
                orderFirstname
                orderTotal
                orderStatus
              }
            }
          }
        `}
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
          console.log(data.users);
          return data.users.map((currentOrder, i) =>
            currentOrder.order.map((thisOrder, i) => (
              <Order key={i} order={thisOrder} />
            ))
          );
        }}
      </Query>
    </Table.Body>
  </Table>
);
export default Products;
