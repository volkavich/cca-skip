import '../styles/globals.css';
import '@interchain-ui/react/styles';
import { wallets } from 'cosmos-kit';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from '@interchain-ui/react';

function MyApp({ Component, pageProps }) {
  const { themeClass } = useTheme();

  const signerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  return (
    <ThemeProvider>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={wallets}
        walletConnectOptions={{
          signClient: {
            projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'CCA Skip',
              description: 'A Skip API Implementation',
              url: 'https://docs.cosmology.zone/cosmos-kit/',
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        <Box
          className={themeClass}
          minHeight='100dvh'
          backgroundColor={useColorModeValue('$white', '$background')}
        >
          <Component {...pageProps} />
        </Box>
      </ChainProvider>
    </ThemeProvider>
  );
}

export default MyApp;
