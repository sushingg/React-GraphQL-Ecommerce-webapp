import React from "react";
import Loader from "../Loader";
import {
  Container,
  Segment,
  Grid,
  Responsive
} from "semantic-ui-react";
const Products = React.lazy(() => import("./Products"));
const Category = React.lazy(() => import("../Category/Categories"));
const Slide = React.lazy(() => import("../Slide/Slide"));
const HomepageHeading = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Segment padded basic>
      <React.Suspense fallback={<Loader />}>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <Category />
          </Grid.Column>
          <Grid.Column width={11}>
            <Slide />
          </Grid.Column>
        </Grid>
      </React.Suspense>
    </Segment>
  </Responsive>
);

const ShowAllProduct = () => (
  <Container>
    <HomepageHeading />
    <Segment basic style={{ paddingBottom: "3em", paddingTop: "3em" }}>
      <React.Suspense fallback={<Loader />}>
        <Products />
      </React.Suspense>
    </Segment>
  </Container>
);
export default ShowAllProduct;
