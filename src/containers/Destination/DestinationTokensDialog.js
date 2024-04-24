import React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import styles from './Destination.module.css';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';
import useDestinationStore from '../../store/destinationStore';
import useDataStore from '../../store/dataStore';

const DestinationTokensDialog = () => {
  const {
    destinationTokenDialogOpen,
    hideDestinationTokenDialog,
    setDestinationToken,
    destinationChain,
  } = useDestinationStore();

  const { tokens, fetchTokensInProgress } = useDataStore();

  const handleClick = (value) => {
    setDestinationToken(value);
    hideDestinationTokenDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideDestinationTokenDialog()}
      open={destinationTokenDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideDestinationTokenDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Destination Token</h2>
        </div>
        {fetchTokensInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          tokens &&
          tokens[`${destinationChain.chain_id}`] &&
          tokens[`${destinationChain.chain_id}`].assets &&
          tokens[`${destinationChain.chain_id}`].assets.map((token) => (
            <div
              className={styles.chain_info}
              key={token.chain_id}
              onClick={() => handleClick(token)}
            >
              <Image src={token.logo_uri} alt={token.denom} width={30} height={30} />
              <div className={styles.chain_name}>
                <p>{token.name}</p>
                <span>{token.chain_id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Dialog>
  );
};

export default DestinationTokensDialog;
