import { ClientCtrl, ConfigCtrl } from '@web3modal/core';
import { chains, providers } from '@web3modal/ethereum';
import { ethers } from "ethers";
import '@web3modal/ui';
import contractData from './abi.json';

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

// on add transaction
$("#add-transaction").submit((e) => {
  
  e.preventDefault();

  let address = $("#add-transaction #fAddress").val();
  let value = $("#add-transaction #fValue").val();
  let callData = $("#add-transaction #fData").val();

  // send the transaction data to the smart contract
  const abi = contractData.abi;
  
  const config = {
    addressOrName: ''
  }
  console.log(ethereumConfig.providers);
});

// on page load
$(document).ready(function() {
  // load queued transactions

  //TODO: Implement collection of transactions
  let queued = [{
    'releaseDate': '6h 23m',
    'value': '100 ETH',
    'address': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  }];

  let i = 0;
  for (let q in queued)
  {
    i += 1;
    $("#queued").append(`
    <tr>
      <th>${i}</th>
      <th>${queued[q]['releaseDate']}</th>
      <th>${queued[q]['value']}</th>
      <th>${queued[q]['address']}</th>
    </tr>
    `);

    console.log(q);
  }
})