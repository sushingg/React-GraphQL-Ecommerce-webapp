import React from 'react';
import { Card, CardImg, CardText, CardBody, CardFooter,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
const Product = (props) => {
  return (
    <div className="d-flex justify-content-around col-lg-3 col-md-6 mb-4 ">
      <Card className="mb-4 shadow"	>
        <CardImg top width="100%" src="https://placehold.it/300x200" alt="Card image cap" />
        <CardBody className="text-center py-4">
          <CardTitle className="text-secondary">{props.product.productTitle}</CardTitle>
          <CardSubtitle className="text-dark">{props.product.productDescription}</CardSubtitle>
          <CardText className="text-primary py-2"><strong>{props.product.productPrice}฿</strong></CardText>
        </CardBody>
		<button className="product_cart_button">Add to Cart</button>
      </Card>
    </div>
  );
};

export default Product;
