import styles from './Route.module.css';
import { Button } from '@mui/material';
import useRouteStore from '../../store/routeStore';
import useSourceChainsStore from '../../store/sourceChainsStore';
import useSourceTokensStore from '../../store/sourceTokensStore';
import useDestinationStore from '../../store/destinationStore';

const Route = () => {
  const { routeData, postRouteRequest } = useRouteStore();
  const { selectedSourceChain } = useSourceChainsStore();
  const { selectedToken } = useSourceTokensStore();
  const { destinationChain, destinationToken } = useDestinationStore();

  const handleClick = () => {
    postRouteRequest(
      selectedToken.denom,
      selectedSourceChain.chain_id,
      destinationToken.denom,
      destinationChain
    );
  };

  console.log(routeData);

  return (
    <div className={styles.route}>
      {selectedToken &&
      selectedSourceChain &&
      destinationToken &&
      destinationChain ? (
        <Button onClick={handleClick}>Get Route</Button>
      ) : null}
      {routeData && routeData.operations && routeData.operations[0].transfer ? (
        <div className={styles.details}>
          <p>
            Bridge:{' '}
            {routeData.operations[0].transfer.bridge_id &&
              routeData.operations[0].transfer.bridge_id}
          </p>
          <p>
            From:{' '}
            {routeData.operations[0].transfer.bridge_id &&
              routeData.operations[0].transfer.chain_id}
          </p>
          <p>
            To:{' '}
            {routeData.operations[0].transfer.bridge_id &&
              routeData.operations[0].transfer.to_chain_id}
          </p>
          <p>
            Port:{' '}
            {routeData.operations[0].transfer.bridge_id &&
              routeData.operations[0].transfer.port}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Route;
