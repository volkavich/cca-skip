import React from 'react';
import styles from './Destination.module.css';
import useDestinationStore from '../../store/destinationStore';
import useDataStore from '../../store/dataStore';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';

const DestinationChainsDialog = () => {
  const { destinationChainDialogOpen, hideDestinationChainDialog, setDestinationChain } =
    useDestinationStore();

  const { chains, fetchChainsInProgress } = useDataStore();

  const handleClick = (value) => {
    setDestinationChain(value);
    hideDestinationChainDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideDestinationChainDialog()}
      open={destinationChainDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideDestinationChainDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Destination Network</h2>
        </div>
        {fetchChainsInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          chains &&
          chains.map((chain) => (
            <div
              className={styles.chain_info}
              key={chain.chain_id}
              onClick={() => handleClick(chain)}
            >
              <Image src={chain.logo_uri} alt={chain.chain_name} width={30} height={30} />
              <div className={styles.chain_name}>
                <p>{chain.chain_name}</p>
                <span>{chain.chain_id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Dialog>
  );
};

export default DestinationChainsDialog;
