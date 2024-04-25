import styles from './Source.module.css';
import { TextField } from '@mui/material';
import useSourceStore from '../../store/sourceStore';

const AmountTextField = () => {
  const { sourceAmount, setSourceAmount, sourceChain, sourceToken } = useSourceStore();

  const handleChange = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const value = String(e.target.value * 1000000)
    setSourceAmount(value);
  };

  return (
    <TextField
      disabled={
        (sourceChain && !Object.keys(sourceChain).length > 0) ||
        (sourceToken && !Object.keys(sourceToken).length > 0)
      }
      className={styles.input}
      variant='outlined'
      value={sourceAmount && sourceAmount / 1000000}
      label='Source Amount'
      onChange={handleChange}
    />
  );
};

export default AmountTextField;
