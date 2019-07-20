import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import { Table, Message, Button } from "semantic-ui-react";
const Users = () => (
  <Table stackable padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="4">User list</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell colSpan="1">ชื่อผู้ใช้งาน</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">อีเมล์</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">เบอร์โทรศัพท์</Table.HeaderCell>
        <Table.HeaderCell colSpan="1" textAlign="right">
          ประเภท
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Query
        query={gql`
          {
            users {
              id
              name
              email
              mobileNumber
              type
              address {
                id
                firstName
                lastName
                addr
                distric
                province
                mobileNumber
                postcode
              }
            }
          }
        `}
      >
        {({ loading, error, data, refetch }) => {
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
          return (
            <>
              {data.users.map((currentUser, i) => (
                <User key={i} user={currentUser} refetch={refetch} />
              ))}
              <Table.Row>
                <Table.Cell colSpan="6" textAlign="center">
                  <Button fluid onClick={() => refetch()}>
                    reload
                  </Button>
                </Table.Cell>
              </Table.Row>
            </>
          );
        }}
      </Query>
    </Table.Body>
  </Table>
);
export default Users;
