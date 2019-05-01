import React, { useState } from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
const P404 = props => {
  return (
    <>
      <Container style={{ padding: "3em 0em" }}>
        <Segment placeholder>
          <Header as='h2' icon>
            <Icon name="file alternate" />
            404
            <Header.Content>
              <Link to="/">back</Link>
            </Header.Content>
          </Header>
        </Segment>
      </Container>
    </>
  );
};
export default P404;
