import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
const Product = (props) => {
  return (
    <div className="d-flex justify-content-around col-lg-3 col-md-6 mb-4 ">
      <Card className="mb-4 shadow"	>
        <CardImg top width="100%" src={"/image/"+props.product.productSlug+"/"+props.product.productImage}alt="Card image cap" />
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
