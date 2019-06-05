import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from "./Product";
import Loader from "../Loader";
import {
  Card,
  Container,
  Segment,
  Message,
  Grid,
  Responsive
} from "semantic-ui-react";
import Slide from "../Slide/Slide";
import Category from "../Category/Categories";
const HomepageHeading = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Segment padded basic>
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Category />
        </Grid.Column>
        <Grid.Column width={11}>
          <Slide />
        </Grid.Column>
      </Grid>
    </Segment>
  </Responsive>
);

const Products = () => (
  <Container >
    <HomepageHeading />
    <Segment basic style={{ paddingBottom: "3em", paddingTop: "3em" }}>
      <Grid textAlign='center'>
        <Grid.Column largeScreen={16} mobile={13}>
          <Card.Group itemsPerRow={4} stackable>
            <Query
              query={gql`
                {
                  products(limit: 12) {
                    product {
                      slug
                      title
                      price
                      description
                      image {
                        altText
                        name
                      }
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
                return data.products.product.map((currentProduct, i) => (
                  <Product key={i} product={currentProduct} />
                ));
              }}
            </Query>
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  </Container>
);
export default Products;
