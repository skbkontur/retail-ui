import { Icon, Button, Input } from "retail-ui";

props => (
  <>
    <Button icon="Ok" />
    <Button icon={"Ok"} />
    <Button icon={<Icon name="Ok" />} />
    <Button icon={props.success ? "Ok" : "Remove"} />
    <Button icon={<Icon name={props.success ? "Ok" : "Remove"} />} />
    <Button icon={props.success ? <Icon name="Ok" size="24px" /> : "Remove"} />
    <Button icon={props.success ? "Ok" : <Icon name="Remove" color="red" />} />
    <Button
      icon={
        props.success ? (
          <Icon name="Ok" size="24px" />
        ) : (
          <Icon name="Remove" color="red" />
        )
      }
    />
    <Button icon={props.success ? props.icon : "Remove"} />
    <Button icon={props.success ? "Ok" : props.icon} />
    <Button icon={props.success ? props.icon : <Icon name="Remove" />} />
    <Button icon={props.success ? <Icon name="Ok" /> : props.icon} />
    <Button icon={props.success ? props.icon : props.icon} />
    <Button icon={props.icon} />
  </>
);
