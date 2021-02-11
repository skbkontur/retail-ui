import { Icon, Button, Input } from "retail-ui";

props => (
  <>
    <Icon name="Ok" />
    <Icon name={"Ok"} />
    <Icon name={props.success ? "Ok" : "Remove"} />
    <Icon name={props.success ? props.name : "Remove"} />
    <Icon name={props.success ? "Ok" : props.name} />
    <Icon name={props.success ? props.name : props.name} />
    <Icon name={props.name} />
  </>
);
