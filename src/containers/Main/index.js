import React from 'react';
import styles from './Main.module.css';
import Source from '../Source';
import Destination from '../Destination';
import useDestinationStore from '../../store/destinationStore';
import useSourceChainsStore from '../../store/sourceChainsStore';
import useSourceTokensStore from '../../store/sourceTokensStore';

const Home = () => {
  const { destinationData, postDestinationRequest } = useDestinationStore();
  const { selectedToken } = useSourceTokensStore();
  const { selectedSourceChain } = useSourceChainsStore();

  React.useEffect(() => {
    if (
      selectedToken &&
      Object.keys(selectedToken).length > 0 &&
      selectedSourceChain &&
      Object.keys(selectedSourceChain).length > 0
    ) {
      postDestinationRequest(selectedToken.denom, selectedSourceChain.chain_id);
    }
  }, [selectedToken, selectedSourceChain]);

  // console.log('token', selectedToken);
  // console.log('sourceChain', selectedSourceChain);

  console.log('destination===>', destinationData);

  return (
    <div className={styles.main}>
      <Source />
      <Destination />
    </div>
  );
};

export default Home;
