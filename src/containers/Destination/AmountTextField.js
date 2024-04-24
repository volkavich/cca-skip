import styles from './Destination.module.css';
import { TextField } from '@mui/material';
import useRouteStore from '../../store/routeStore';

const AmountTextField = () => {
  const { routeData } = useRouteStore();

  if (routeData && Object.keys(routeData).length > 0) {
    return (
      <TextField
        disabled
        className={styles.input}
        variant='outlined'
        value={routeData.amount_out}
        label='Destination Amount'
      />
    );
  }
};

export default AmountTextField;
