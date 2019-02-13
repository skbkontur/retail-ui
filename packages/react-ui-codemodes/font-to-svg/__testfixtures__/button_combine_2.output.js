import { Button, Input } from "retail-ui";

import OkIcon from "@skbkontur/react-icons/Ok";
import RemoveIcon from "@skbkontur/react-icons/Remove";

props => (
  <>
    <Button icon={<OkIcon />} />
    <Button icon={<OkIcon />} />
    <Button icon={<OkIcon />} />
    <Button icon={props.success ? <OkIcon /> : <RemoveIcon />} />
    <Button icon={props.success ? <OkIcon /> : <RemoveIcon />} />
    <Button icon={props.success ? <OkIcon size="24px" /> : <RemoveIcon />} />
    <Button icon={props.success ? <OkIcon /> : <RemoveIcon color="red" />} />
    <Button
      icon={
        props.success ? (
          <OkIcon size="24px" />
        ) : (
          <RemoveIcon color="red" />
        )
      }
    />
    <Button icon={props.success ? props.icon : <RemoveIcon />} />
    <Button icon={props.success ? <OkIcon /> : props.icon} />
    <Button icon={props.success ? props.icon : <RemoveIcon />} />
    <Button icon={props.success ? <OkIcon /> : props.icon} />
    <Button icon={props.success ? props.icon : props.icon} />
    <Button icon={props.icon} />
  </>
);
