import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Card, Message, Grid} from "semantic-ui-react";
const Product = React.lazy(() => import("./Product"));

const Products = () => (
  <Grid textAlign="center">
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
                  quantity
                  image {
                    altText
                    name
                  }
                }
              }
            }
          `}
          pollInterval={20000}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading..</div>;
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
);
export default Products;
