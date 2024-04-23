import styles from './Main.module.css';
import useCountStore from '../../store/countStore';
import { Button } from '@mui/material';

const Home = () => {
  const { count, inc, dec } = useCountStore();

  return (
    <div className={styles.main}>
      <h1>{count}</h1>
      <Button onClick={inc}>Inc</Button>
      <Button onClick={dec}>Dec</Button>
    </div>
  );
};

export default Home;
