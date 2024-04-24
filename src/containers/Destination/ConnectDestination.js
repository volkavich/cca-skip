import styles from './Destination.module.css';
import { Button } from '@mui/material';
import { useChain } from '@cosmos-kit/react';
import { getWrapAddress } from '../../../utils/strings';
import useDestinationStore from '../../store/destinationStore';

const ConnectDestination = () => {
  const { destinationChain } = useDestinationStore();
  const chainName = destinationChain.chain_name;
  const { status, address, connect, openView } = useChain(chainName);

  const handleClick = () => {
    if (status === 'Disconnected') {
      connect();
    } else if (status === 'Connected') {
      openView();
    }
  };

  return (
    <Button onClick={handleClick} className={styles.connect}>
      {status === 'Connected'
        ? getWrapAddress(address, 6, 6)
        : status === 'Connecting'
        ? 'Connecting...'
        : 'Connect'}
    </Button>
  );
};

export default ConnectDestination;
