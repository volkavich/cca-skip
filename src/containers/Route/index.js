import React from 'react';
import styles from './Route.module.css';
import { Button, CircularProgress } from '@mui/material';
import useRouteStore from '../../store/routeStore';
import useSourceStore from '../../store/sourceStore';
import useDestinationStore from '../../store/destinationStore';

const Route = () => {
  const { routeData, postRouteRequest, postRouteInProgress, routeFound } = useRouteStore();
  const { sourceChain, sourceToken } = useSourceStore();
  const { destinationChain, destinationToken } = useDestinationStore();

  const handleClick = () => {
    if (
      sourceToken.denom &&
      sourceChain.chain_id &&
      destinationToken.denom &&
      destinationChain.chain_id
    ) {
      postRouteRequest(
        sourceToken.denom,
        sourceChain.chain_id,
        destinationToken.denom,
        destinationChain.chain_id
      );
    }
  };

  const disable =
    !sourceToken.denom ||
    !sourceChain.chain_id ||
    !destinationToken.denom ||
    !destinationChain.chain_id;

  return (
    <div className={styles.route}>
      <Button disabled={disable} onClick={handleClick}>
        {postRouteInProgress ? <CircularProgress /> : <p>Get Route</p>}
      </Button>
      {routeFound === 'true' && routeData && Object.keys(routeData).length ? (
        <div className={styles.green}>
          Route found with {routeData.operations && routeData.operations.length} operations and{' '}
          {routeData.txs_required} <i>txs</i>
        </div>
      ) : (
        routeFound === 'error' && <div className={styles.red}>No Route found</div>
      )}
    </div>
  );
};

export default Route;
