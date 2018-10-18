import { Button, Input } from "retail-ui";

import Icon from "@skbkontur/react-icons";

props => (
  <>
    <Button icon={<Icon.Ok />} />
    <Button icon={<Icon.Ok />} />
    <Button icon={<Icon.Ok />} />
    <Button icon={<Icon name={props.success ? "Ok" : "Remove"} />} />
    <Button icon={<Icon name={props.success ? "Ok" : "Remove"} />} />
    <Button icon={props.success ? <Icon.Ok size="24px" /> : <Icon.Remove />} />
    <Button icon={props.success ? <Icon.Ok /> : <Icon.Remove color="red" />} />
    <Button
      icon={
        props.success ? (
          <Icon.Ok size="24px" />
        ) : (
          <Icon.Remove color="red" />
        )
      }
    />
    <Button icon={props.success ? props.icon : <Icon.Remove />} />
    <Button icon={props.success ? <Icon.Ok /> : props.icon} />
    <Button icon={props.success ? props.icon : <Icon.Remove />} />
    <Button icon={props.success ? <Icon.Ok /> : props.icon} />
    <Button icon={props.success ? props.icon : props.icon} />
    <Button icon={props.icon} />
    <Icon name={props.name} />
  </>
);
