import * as React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import styles from './Destination.module.css';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';
import useDestinationStore from '../../store/destinationStore';
import useSourceStore from '../../store/sourceStore';

const DestinationChainsDialog = () => {
  const {
    destinationTokenDialogOpen,
    hideDestinationTokensDialog,
    setDestinationToken,
    destinationChain,
  } = useDestinationStore();

  const { fetchSourceTokensDataInProgress, sourceTokensData } = useSourceStore();

  const handleClick = (value) => {
    setDestinationToken(value);
    hideDestinationTokensDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideDestinationTokensDialog()}
      open={destinationTokenDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideDestinationTokensDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Destination Token</h2>
        </div>
        {fetchSourceTokensDataInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          sourceTokensData &&
          sourceTokensData[`${destinationChain.chain_id}`] &&
          sourceTokensData[`${destinationChain.chain_id}`].assets &&
          sourceTokensData[`${destinationChain.chain_id}`].assets.map((token) => (
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

export default DestinationChainsDialog;
