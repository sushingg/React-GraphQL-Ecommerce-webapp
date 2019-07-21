import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Orders from "./Orders";
import Loader from "../../../Loader";
import _ from "lodash";
import {
  Message,
  Segment,
  Table,
  Header,
  Placeholder
} from "semantic-ui-react";

const Placehold = props => {
  return (
    <>
      <Header as="h3">Order | รายการสั่งซื้อ</Header>
      <Table>
        <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};
class SingleOrder extends React.Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <Query
        fetchPolicy="network-only"
        query={gql`
          {
            me {
              id
              order {
                id
                paymentId
                total
                status
                orderProduct {
                  slug
                  title
                  price
                  quantity
                }
                createdAt
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Placehold />;
          if (error)
            return (
              <Segment basic textAlign="center">
                <Message warning compact>
                  {error.message}
                </Message>
              </Segment>
            );
          return (
            <>
              <Header as="h3">Order | รายการสั่งซื้อ</Header>
              <Table>
                <Table.Body>
                  {data.me.order.map((currentOrder, i) => (
                    <Orders
                      key={i}
                      order={currentOrder}
                      setId={this.props.setId}
                    />
                  ))}
                </Table.Body>
              </Table>
            </>
          );
        }}
      </Query>
    );
  }
}
export default SingleOrder;
