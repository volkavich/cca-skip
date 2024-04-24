import * as React from 'react';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import useSourceStore from '../../store/sourceStore';
import styles from './Source.module.css';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';

const SourceChainsDialog = () => {
  const {
    hideSourceChainDialog,
    sourceChainDialogOpen,
    sourceChainsData,
    setSourceChain,
    fetchSourceChainsDataInProgress,
  } = useSourceStore();

  const handleClick = (value) => {
    setSourceChain(value);
    hideSourceChainDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideSourceChainDialog()}
      open={sourceChainDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideSourceChainDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Source Network</h2>
        </div>
        {fetchSourceChainsDataInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          sourceChainsData &&
          sourceChainsData.map((chain) => (
            <div
              className={styles.chain_info}
              key={chain.chain_id}
              onClick={() => handleClick(chain)}
            >
              <Image
                src={chain.logo_uri}
                alt={chain.chain_name}
                width={30}
                height={30}
              />
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

export default SourceChainsDialog;
