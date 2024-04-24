import styles from './Destination.module.css';
import useDestinationStore from '../../store/destinationStore';
import { Button } from '@mui/material';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import DestinationChainsDialog from './DestinationChainsDialog';
import DestinationTokensDialog from './DestinationTokensDialog';
import React from 'react';

const Destination = () => {
  const {
    destinationData,
    showDestinationChainsDialog,
    destinationChain,
    showDestinationTokensDialog,
    destinationToken,
  } = useDestinationStore();
  return (
    <div className={styles.destination}>
      <h2>Destination</h2>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showDestinationChainsDialog()}>
            {destinationChain ? (
              <div className={styles.selected_chain}>
                <p>{destinationChain}</p>
              </div>
            ) : (
              'Select Chain'
            )}
            <RiArrowDropDownLine />
          </Button>
          <Button
            disabled={!destinationChain}
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
