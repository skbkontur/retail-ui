import EmoticonHappyIcon from '@skbkontur/react-icons/EmoticonHappy';
import EmoticonSadIcon from '@skbkontur/react-icons/EmoticonSad';
import EyeClosedIcon from '@skbkontur/react-icons/EyeClosed';
import EyeOpenedIcon from '@skbkontur/react-icons/EyeOpened';
import Button from 'retail-ui/Button';

(props) => (
  <>
    <Button icon={props.isSuccess ? <EmoticonHappyIcon /> : <EmoticonSadIcon />}>{props.message}</Button>
    {props.isHidden ? <EyeClosedIcon color="red" size="32px" /> : <EyeOpenedIcon color="red" size="32px" />}
  </>
);
