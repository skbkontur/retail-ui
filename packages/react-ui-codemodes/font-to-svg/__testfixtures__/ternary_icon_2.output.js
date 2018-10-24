import Button from "retail-ui/Button";
import Icon from "@skbkontur/react-icons";

props => (
  <>
    <Button icon={<Icon name={props.isSuccess ? "EmoticonHappy" : "EmoticonSad"} />}>
      {props.message}
    </Button>
    <Icon
      color="red"
      size="32px"
      name={props.isHidden ? "EyeClosed" : "EyeOpened"}
    />
    <Icon name={props.name} />
  </>
);
