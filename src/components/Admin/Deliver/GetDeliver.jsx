import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { Segment, Message } from "semantic-ui-react";
import Deliver from "./Deliver"
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2
});
const FormExampleForm = () => (
  <>
    <Query
      fetchPolicy="network-only"
      query={gql`
        {
          usersOrder(status: "successful") {
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
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Segment textAlign="center">
              <Message compact>loading</Message>
            </Segment>
          );
        if (error)
          return (
            <Segment textAlign="center">
              <Message warning compact>
                {error.message}
              </Message>
            </Segment>
          );

        return (
          <Deliver
            deliver={[].concat.apply(
              [],
              data.usersOrder.map(currentOrder =>
                currentOrder.order.map(thisOrder => ({
                  key: thisOrder.id,
                  value: thisOrder.id,
                  text: thisOrder.id,
                  description:
                    "ยอดรวม: " +
                    formatter.format(thisOrder.total) +
                    " วันที่: " +
                    moment.unix(thisOrder.createdAt / 1000).format("llll")
                }))
              )
            )}
          />
        );
      }}
    </Query>
  </>
);

export default FormExampleForm;
