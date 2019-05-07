import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import Product from "./Product";
import Loader from "../Loader";
import {
  Card,
  Container,
  Segment,
  Message,
  Grid,
  Menu,
  Responsive
} from "semantic-ui-react";
import Slide from "../Slide/Slide";
import Category from "../Category/Categories";
const HomepageHeading = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Segment padded basic>
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Menu vertical fluid attached="top">
            <Menu.Item as={Link} to="/category">
              <h5>All Cetegories</h5>
            </Menu.Item>
            <Category />
          </Menu>
        </Grid.Column>
        <Grid.Column width={11}>
          <Slide />
        </Grid.Column>
      </Grid>
    </Segment>
  </Responsive>
);

const Products = () => (
  <Container>
    <HomepageHeading />
    <Segment basic>
      <Card.Group itemsPerRow={4} stackable>
        <Query
          query={gql`
            {
              products {
                productSlug
                productTitle
                productPrice
                productDescription
                productAddedDate
                productImage {
                  altText
                  name
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader key="" />;
            if (error)
              return (
                <Message>
                  <Message.Header>Error</Message.Header>
                  <p>{error.message}</p>
                </Message>
              );
            return data.products.map((currentProduct, i) => (
              <Product key={i} product={currentProduct} />
            ));
          }}
        </Query>
      </Card.Group>
    </Segment>
  </Container>
);
export default Products;
