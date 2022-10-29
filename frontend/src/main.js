import { ClientCtrl, ConfigCtrl } from '@web3modal/core';
import { chains, providers } from '@web3modal/ethereum';
import '@web3modal/ui';

// Define constants
const PROJECT_ID = '193d058eaacf98328ee7cc3e4c5709c6';

const clientConfig = {
  projectId: PROJECT_ID,
  theme: 'dark',
  accentColor: 'default'
}

const ethereumConfig = {
  appName: 'web3Modal',
  autoConnect: true,
  chains: [chains.mainnet],
  providers: [providers.walletConnectProvider({ projectId: PROJECT_ID })]
}

// Set up core and ethereum clients
ConfigCtrl.setConfig(clientConfig);
ClientCtrl.setEthereumClient(ethereumConfig);