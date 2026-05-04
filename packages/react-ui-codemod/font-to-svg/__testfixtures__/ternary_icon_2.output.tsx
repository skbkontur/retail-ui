import Icon from '@skbkontur/react-icons';
import Button from 'retail-ui/Button';

(props) => (
  <>
    <Button icon={<Icon name={props.isSuccess ? 'EmoticonHappy' : 'EmoticonSad'} />}>{props.message}</Button>
    <Icon color="red" size="32px" name={props.isHidden ? 'EyeClosed' : 'EyeOpened'} />
    <Icon name={props.name} />
  </>
);
