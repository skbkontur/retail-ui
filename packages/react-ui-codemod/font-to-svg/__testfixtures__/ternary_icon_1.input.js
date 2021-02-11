import Button from "retail-ui/Button";
import Icon from "retail-ui/Icon";

props => (
  <>
    <Button icon={props.isSuccess ? "EmoticonHappy" : "EmoticonSad"}>
      {props.message}
    </Button>
    <Icon
      color="red"
      size="32px"
      name={props.isHidden ? "EyeClosed" : "EyeOpened"}
    />
  </>
);
