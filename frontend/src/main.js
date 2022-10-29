import { ClientCtrl, ConfigCtrl } from '@web3modal/core';
import { chains, providers } from '@web3modal/ethereum';
import {ethers} from 'ethers';
import '@web3modal/ui';
import contractData from './abi.json';

// Define constants
const PROJECT_ID = '193d058eaacf98328ee7cc3e4c5709c6';
const CONTRACT_ADDRESS = '0xd48f04cea474ce2b2c4fab33889b7a48a5965e93';
const TEMP_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const DELAY_TIME = 1000*60*15;

const clientConfig = {
  projectId: PROJECT_ID,
  theme: 'dark',
  accentColor: 'default'
}

const ethereumConfig = {
  appName: 'web3Modal',
  autoConnect: true,
  chains: [chains.localhost],
  providers: [providers.walletConnectProvider({ projectId: PROJECT_ID })]
}

const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
const signer = ethersProvider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractData.abi, signer);

// Set up core and ethereum clients
ConfigCtrl.setConfig(clientConfig);
ClientCtrl.setEthereumClient(ethereumConfig);

// on add transaction
$("#add-transaction").submit((e) => {
  console.log(window.ethereum);
  e.preventDefault();

  let address = $("#add-transaction #fAddress").val();
  let value = $("#add-transaction #fValue").val();
  let callData = $("#add-transaction #fData").val();
  
  // send the transaction data to the chain
  async function sendTransaction()
  {
    let tx = await contract.queue(address, value, callData, {gasLimit: 5000000});
  }
  sendTransaction();

  // store the transaction data as a cookie
  document.cookie =`${Date.now()}={"address": "${address}", "value": "${value}", "callData": "${callData}"}`;
});

// on page load
$(document).ready(function() {
  // load queued transactions from cookies
  let cookies = getCookies();

  let now = new Date();
  let not_done = 0;
  for (let c of cookies)
  {
    let endTime = new Date(c['releaseUnix']);
    if (now < endTime)
      not_done ++;
  }
  $('#queued-transactions #number').append(`<h1>${not_done}</h1>`)

  // display on the GUI
  let i = 0;
  for (let q in cookies)
  {
    i += 1;
    let endTime = new Date(cookies[q]['releaseUnix']);

    if (endTime < now)
    {
      $("#queued").append(`
      <tr class='complete'>
        <th>${i}</th>
        <th>${cookies[q]['releaseDate']}</th>
        <th>${cookies[q]['value']}</th>
        <th>${cookies[q]['address']}</th>
        <th></th>
      </tr>
      `);
    }
    else
    {
      $("#queued").append(`
      <tr class='incomplete'>
        <th>${i}</th>
        <th>${cookies[q]['releaseDate']}</th>
        <th>${cookies[q]['value']}</th>
        <th>${cookies[q]['address']}</th>
        <th><button class="cancel btn btn-danger", id="${cookies[q]['releaseUnix']}">X</button></th>
      </tr>
      `);
    }
  }
});

$(document).on('click', '.cancel', (e) => {
  let x = e.currentTarget;

  let id = $(x).attr('id');
  console.log(id);

  let cookies = getCookies();
  for (let c in cookies)
  {
    if (cookies[c]['releaseUnix'] == id)
    {
      let address = cookies[c]['address'];
      let value = cookies[c]['value'];
      let data = cookies[c]['callData'];

      console.log(address);
      console.log(value);
      console.log(data);

      console.log(contract);

      async function cancelTransaction()
      {
        let tx = await contract.revert_this_txn(address, value, data, {gasLimit: 5000000});
        console.log(tx);
      }
      cancelTransaction();
    }
  }
});

function getCookies()
{
  let pairs = document.cookie.split(';');
  let cookies = []
  for (let i = 0; i < pairs.length; i ++)
  {
    let pair = pairs[i].split('=');
    let data = JSON.parse(pair[1]);

    if (pair[1].includes(', "value": '))
    {
      // assume the cookie was a transaction
      let date = new Date(parseInt(pair[0]) + DELAY_TIME);
      let endTime = date.toLocaleTimeString("en-US");
      cookies.push({
        'releaseDate': endTime,
        'releaseUnix': date,
        'value': data['value'],
        'address': data['address'],
        'callData': pair[0]
      })
    }
  }

  cookies.sort((a, b) => (a['releaseUnix'] > b['releaseUnix']) ? -1 : 1);
  return cookies;
}