import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Orders from "./Orders";
import Loader from "../../Loader";
import { Message, Segment, Container, Table, Header } from "semantic-ui-react";
class SingleOrder extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <Container style={{ paddingBottom: "3em", paddingTop: "3em" }}>
        <Segment>
          <Query
            fetchPolicy='network-only'
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
              if (loading) return <Loader />;
              if (error)
                return (
                  <Segment basic textAlign="center">
                    <Message warning compact>
                      {error.message}
                    </Message>
                  </Segment>
                );
              console.log(data.me.order);
              return (
                <>
                <Header as="h3">Order | รายการสั่งซื้อ</Header>
                  <Table>
                    <Table.Body>
                      
                      {data.me.order.map((currentOrder, i) => (
                        <Orders key={i} order={currentOrder} />
                      ))}
                    </Table.Body>
                  </Table>
                </>
              );
            }}
          </Query>
        </Segment>
      </Container>
    );
  }
}
export default SingleOrder;
