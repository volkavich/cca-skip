import React from 'react';
import styles from './Destination.module.css';
import useDataStore from '../../store/dataStore';
import useDestinationStore from '../../store/destinationStore';
import { Button } from '@mui/material';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import DestinationChainsDialog from './DestinationChainsDialog';
import DestinationTokensDialog from './DestinationTokensDialog';
import ConnectDestination from './ConnectDestination';

const Destination = () => {
  const { chains, fetchChains, fetchTokens } = useDataStore();

  const {
    destinationChain,
    destinationToken,
    showDestinationChainDialog,
    destinationChainDialogOpen,
    showDestinationTokenDialog,
    destinationTokenDialogOpen,
  } = useDestinationStore();

  React.useEffect(() => {
    if (destinationChainDialogOpen && chains && !chains.length) {
      fetchChains();
    }
  }, [destinationChainDialogOpen]);

  React.useEffect(() => {
    if (
      destinationTokenDialogOpen &&
      destinationChain &&
      Object.keys(destinationChain).length > 0 &&
      destinationToken.chain_id !== destinationChain.chain_id
    ) {
      fetchTokens(destinationChain.chain_id);
    }
  }, [destinationTokenDialogOpen]);

  return (
    <div className={styles.destination}>
      <div className={styles.heading}>
        <h2>Destination</h2>
        {destinationChain && Object.keys(destinationChain).length > 0 ? (
          <ConnectDestination />
        ) : null}
      </div>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showDestinationChainDialog()}>
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
            onClick={() => showDestinationTokenDialog()}
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
