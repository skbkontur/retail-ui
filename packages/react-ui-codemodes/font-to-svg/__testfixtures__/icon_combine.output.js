import { Button, Input } from "retail-ui";

import Icon from "@skbkontur/react-icons";

props => (
  <>
    <Icon.Ok />
    <Icon.Ok />
    <Icon name={props.success ? "Ok" : "Remove"} />
    <Icon name={props.success ? props.name : "Remove"} />
    <Icon name={props.success ? "Ok" : props.name} />
    <Icon name={props.success ? props.name : props.name} />
    <Icon name={props.name} />
  </>
);
