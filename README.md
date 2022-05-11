# Welcome to the Truffle-React dApp Template

<p>this is intended to be a shortcut for a responsive dApp interface<br>
in order to enable more focus on what really matters: Smart Contracts and the EVM</p>

<p>it comes with basic truffle configurations</p>

<p>it currently supports only MetaMask</p>

## Requirements

<p>install <a href="https://trufflesuite.com/">Truffle</a></p>

<p>install <a href="https://metamask.io/">MetaMask</a></p>

<p>register at <a href="https://infura.io/">Infura</a></p>

<p>register at <a href="https://etherscan.io/">Etherscan</a></p>

## Installation

<p>cd to root directory</p>
<p>npm i</p>
<p>cd web-app</p>
<p>npm i</p>

## Environment Variables

<p>there should be two ".env" files in the project</p>

### root directory ".env"

###### MNEMONIC:

<p>private key to the deployer wallet (in secret recovery phrase format)</p>

###### INFURA_KEY:

<p>key provided by Infura RPC provider</p>

###### ETHERSCAN_KEY:

<p>key provided by Etherscan for contract code verification</p>

### web-app directory ".env"

###### REACT_APP_SUPPORTED_CHAINS:

<p>Ethereum lower-cased chain names separated by commas</p>
<p>These are the chains in which the app contracts are deployed<br>
e.g. "mainnet,rinkeby"</p>
<p>If only one chain is supported there should be no comma<br>
e.g. "mainnet"</p>

###### REACT_APP_CONTRACTS:

<p>Contract file names separated by commas</p>
<p>These should be cased exactly like the ".sol" file name<br>
e.g. "MyNFT,Market"</p>
<p>If only one contract exists there should be no comma<br>
e.g. "MyNFT"</p>

###### REACT_APP_BACKEND:

<p>url of backend service (template section to be implemented)</p>

## Truffle Commands

<p>cd to root directory</p>

### Compile and Deploy Contracts

<p>truffle migrate --reset --network $NETWORK_NAME<br>
where "NETWORK_NAME" is declared in truffle-config.js</p>

### Test Contracts

<p>truffle develop<br>
truffle test</p>

###### or

<p>truffle test --network $NETWORK_NAME<br>
where "NETWORK_NAME" is declared in truffle-config.js</p>

### Verify Contracts

<p>truffle run verify $CONTRACT_NAME --network $NETWORK_NAME<br>
where "CONTRACT_NAME" is the name of your solidity contract file in /contracts/<br>
and "NETWORK_NAME" is declared in truffle-config.js</p>

## Web App Commands

<p>cd web-app</p>

### Run in Dev Mode

<p>npm start</p>

### Test

<p>npm test</p>

### Build

<p>npm run build</p>
