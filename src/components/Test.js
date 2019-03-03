// https://www.npmjs.com/package/react-responsive-carousel
import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Dropdown 
} from "semantic-ui-react";
var Carousel = require('react-responsive-carousel').Carousel;

export default class Carous extends Component {
    render() {
        return (
            <div>
                <Header as='h4' attached='top' block>
                    Top Block Header
                </Header>
                <Segment attached>Segment 1</Segment>
                <Segment attached>Segment 2</Segment>
                <Segment attached>Segment 3</Segment>
                <Segment attached>Segment 4</Segment>
                <Segment attached>Segment 5</Segment>
                <Segment attached>Segment 6</Segment>
            </div>
        );
    }
}

// Don't forget to include the css in your page 
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls