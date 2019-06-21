import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loaders = props => {
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
};
export default Loaders;
