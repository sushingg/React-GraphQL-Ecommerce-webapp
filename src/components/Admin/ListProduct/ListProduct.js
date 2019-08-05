import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label } from "semantic-ui-react";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0
});
const ListProduct = props => {
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/admin/product/edit/" + props.product.slug}>
          {props.product.title}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{formatter.format(props.product.price) + " ฿"}</Label>
      </Table.Cell>
      
      <Table.Cell>
        <Label tag>{props.product.quantity + " ชิ้น"}</Label>
      </Table.Cell>
      <Table.Cell textAlign="right">
        {props.product.published ? (
          <Label color="green">Published</Label>
        ) : (
          <Label color="yellow">Draft</Label>
        )}
        <Label basic as={Link} to={"/admin/product/edit/" + props.product.slug}>
          <Icon name="edit" />
          edit
        </Label>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListProduct;
