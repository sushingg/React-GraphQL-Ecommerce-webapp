import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label, Modal } from "semantic-ui-react";
import RemoveProduct from "../Product/RemoveProduct";
const ListProduct = props => {
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/admin/product/edit/" + props.product.slug}>
          {props.product.title}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{props.product.price + " ฿"}</Label>
      </Table.Cell>
      <Table.Cell textAlign="right">
        {(() => {
          switch (props.product.published) {
            case "published":
              return <Label color="green">Published</Label>;
            default:
              return <Label color="yellow">Draft</Label>;
          }
        })()}
        <Label basic as={Link} to={"/admin/product/edit/" + props.product.slug}>
          <Icon name="edit" />
          edit
        </Label>
        <Modal
          trigger={
            <Label
              basic
              color="red"
              //as={Link} to={"/admin/removeproduct/" + props.product.slug+ "/"+props.product.id}
            >
              <Icon name="delete" />
              delete
            </Label>
          }
          basic
          size="small"
        >
          <RemoveProduct id={props.product.id} slug={props.product.slug} refetch={props.refetch} />
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListProduct;
