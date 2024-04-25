import React from 'react';
import styles from './Main.module.css';
import Source from '../Source';
import Destination from '../Destination';
import Route from '../Route';
import Transaction from '../Transaction';

const Home = () => {
  return (
    <div className={styles.main}>
      <Source />
      <Destination />
      <Route />
      <Transaction />
    </div>
  );
};

export default Home;
