import styles from './Destination.module.css';
import useSourceStore from '../../store/sourceStore';
import useDestinationStore from '../../store/destinationStore';
import { Button } from '@mui/material';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import DestinationChainsDialog from './DestinationChainsDialog';
import DestinationTokensDialog from './DestinationTokensDialog';
import React from 'react';

const Destination = () => {
  const {
    showDestinationChainsDialog,
    showDestinationTokensDialog,
    destinationChain,
    destinationToken,
    destinationChainsDialogOpen,
    destinationTokensDialogOpen,
  } = useDestinationStore();

  const { sourceChainsData, fetchSourceChainData } = useSourceStore();

  React.useEffect(() => {
    if (destinationChainsDialogOpen && sourceChainsData && !sourceChainsData.length) {
      fetchSourceChainData();
    }
  }, [destinationChainsDialogOpen]);

  console.log('des token===>', destinationToken.chain_id);

  React.useEffect(() => {
    if (
      destinationTokensDialogOpen &&
      destinationChain &&
      Object.keys(destinationChain).length > 0 &&
      destinationToken.chain_id !== destinationChain.chain_id
    ) {
      fetchSourceTokenData(destinationToken.chain_id);
    }
  }, [destinationTokensDialogOpen]);

  return (
    <div className={styles.destination}>
      <h2>Destination</h2>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showDestinationChainsDialog()}>
            {destinationChain && Object.keys(destinationChain).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={destinationChain.logo_uri}
                  alt={destinationChain.chain_name}
                  width={30}
                  height={30}
                />
                <p>{destinationChain.chain_name}</p>
              </div>
            ) : (
              'Select Chain'
            )}
            <RiArrowDropDownLine />
          </Button>
          <Button
            disabled={!destinationChain || !Object.keys(destinationChain).length}
            onClick={() => showDestinationTokensDialog()}
          >
            {destinationToken && Object.keys(destinationToken).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={destinationToken.logo_uri}
                  alt={destinationToken.name}
                  width={30}
                  height={30}
                />
                <p>{destinationToken.name}</p>
              </div>
            ) : (
              'Select Token'
            )}
            <RiArrowDropDownLine />
          </Button>
        </div>
      </div>
      <DestinationChainsDialog />
      <DestinationTokensDialog />
    </div>
  );
};

export default Destination;
