import React from 'react';
import styles from './Source.module.css';
import useSourceChainsStore from '../../store/sourceChainsStore';
import useSourceTokensStore from '../../store/sourceTokensStore';
import { Button } from '@mui/material';
import SourceChainsDialog from './SourceChainsDialog';
import SourceTokensDialog from './SourceTokensDialog';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Image from 'next/image';

const Source = () => {
  const {
    fetchSourceChainData,
    sourceChainsData,
    sourceChainDialogOpen,
    showSourceChainDialog,
    selectedSourceChain,
  } = useSourceChainsStore();

  const {
    fetchSourceTokenData,
    sourceTokenDialogOpen,
    showSourceTokenDialog,
    selectedToken,
  } = useSourceTokensStore();

  React.useEffect(() => {
    if (sourceChainDialogOpen && sourceChainsData && !sourceChainsData.length) {
      fetchSourceChainData();
    }
  }, [sourceChainDialogOpen]);

  React.useEffect(() => {
    if (
      sourceTokenDialogOpen &&
      selectedSourceChain &&
      Object.keys(selectedSourceChain).length > 0 &&
      selectedToken.chain_id !== selectedSourceChain.chain_id
    ) {
      fetchSourceTokenData(selectedSourceChain.chain_id);
    }
  }, [sourceTokenDialogOpen]);

  return (
    <div className={styles.source}>
      <h2>Source</h2>
      <div className={styles.main_section}>
        <div className={styles.col1}>
          <Button onClick={() => showSourceChainDialog()}>
            {selectedSourceChain &&
            Object.keys(selectedSourceChain).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={selectedSourceChain.logo_uri}
                  alt={selectedSourceChain.chain_name}
                  width={30}
                  height={30}
                />
                <p>{selectedSourceChain.chain_name}</p>
              </div>
            ) : (
              'Select Chain'
            )}
            <RiArrowDropDownLine />
          </Button>
          <Button onClick={() => showSourceTokenDialog()}>
            {selectedToken && Object.keys(selectedToken).length > 0 ? (
              <div className={styles.selected_chain}>
                <Image
                  src={selectedToken.logo_uri}
                  alt={selectedToken.name}
                  width={30}
                  height={30}
                />
                <p>{selectedToken.name}</p>
              </div>
            ) : (
              'Select Token'
            )}
            <RiArrowDropDownLine />
          </Button>
        </div>
      </div>
      <SourceChainsDialog />
      <SourceTokensDialog />
    </div>
  );
};

export default Source;
