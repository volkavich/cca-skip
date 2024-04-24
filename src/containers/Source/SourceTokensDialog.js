import React from 'react';
import styles from './Source.module.css';
import useSourceStore from '../../store/sourceStore';
import useDataStore from '../../store/dataStore';
import { Dialog, IconButton, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';

const SourceTokensDialog = () => {
  const { tokens, fetchTokensInProgress } = useDataStore();
  const { sourceChain, hideSourceTokenDialog, sourceTokenDialogOpen, setSourceToken } =
    useSourceStore();

  const handleClick = (value) => {
    setSourceToken(value);
    hideSourceTokenDialog();
  };

  return (
    <Dialog
      className={styles.dialog}
      onClose={() => hideSourceTokenDialog()}
      open={sourceTokenDialogOpen}
    >
      <div className={styles.dialog_content}>
        <div className={styles.dialog_heading}>
          <IconButton onClick={() => hideSourceTokenDialog()}>
            <IoArrowBackOutline />
          </IconButton>
          <h2>Select Source Token</h2>
        </div>
        {fetchTokensInProgress ? (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        ) : (
          tokens &&
          tokens[`${sourceChain.chain_id}`] &&
          tokens[`${sourceChain.chain_id}`].assets &&
          tokens[`${sourceChain.chain_id}`].assets.map((token) => (
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

export default SourceTokensDialog;
