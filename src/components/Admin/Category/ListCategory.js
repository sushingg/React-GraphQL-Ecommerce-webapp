import React from "react";
import { Link } from "react-router-dom";
import { List, Icon, Label, Modal } from "semantic-ui-react";
import RemoveCategory from "./RemoveCategory";
const ListProduct = props => {
  return (
    <List.Item>
      <List.Header>
        {props.category.title + "  "}
        <Label
          basic
          as={Link}
          to={
            "/admin/category/addsub/" +
            props.category.slug +
            "/" +
            props.category.id
          }
        >
          Add Subcategory
        </Label>
        <Modal
          trigger={
            <Label basic color="red">
              <Icon name="delete" />
              delete Category
            </Label>
          }
          basic
          size="small"
        >
          <RemoveCategory
            id={props.category.id}
            slug={props.category.slug}
            cate={true}
            refetch={props.refetch}
          />
        </Modal>
      </List.Header>

      <List.List>
        {props.category.subCategory.map((sub, i) => (
          <List.Item>
            <List.Header>
              {sub.title + "  "}
              <Modal
                trigger={
                  <Label basic color="red">
                    <Icon name="delete" />
                    delete SubCategory
                  </Label>
                }
                basic
                size="small"
              >
                <RemoveCategory
                  id={sub.id}
                  slug={sub.slug}
                  cate={false}
                  refetch={props.refetch}
                />
              </Modal>
            </List.Header>
          </List.Item>
        ))}
      </List.List>
    </List.Item>
  );
};

export default ListProduct;
