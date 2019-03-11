// https://www.npmjs.com/package/react-responsive-carousel
import React from 'react'
import {
  Dropdown 
} from "semantic-ui-react";
import {  Link } from "react-router-dom";

const Category = (props) => {
  return (
    <Dropdown scrolling item  text={props.category.categoryTitle}>
      <Dropdown.Menu>
        <Dropdown.Header>{props.category.categoryTitle}</Dropdown.Header>
        {props.category.categoryTags.map((tags,i) => (<Dropdown.Item  as={Link} to={"/c/"+props.category.categoryTitle+"/"+tags.tag}>{tags.tag}</Dropdown.Item>))}
      </Dropdown.Menu>
    </Dropdown>
  );

};

export default Category;
