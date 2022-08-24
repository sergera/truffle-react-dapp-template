# Truffle-React dApp Template

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

<pre><code>cd to project root</pre></code>
<pre><code>npm i</code></pre>
<pre><code>cd web-app</pre></code>
<pre><code>npm i</pre></code>

## Environment Variables

<p>there should be two ".env" files in the project</p>

### root directory ".env"

###### MNEMONIC:

<p>private key to the deployer wallet (in secret recovery phrase format)</p>

###### RPC_PROVIDER_MAINNET_URL:

<p>mainnet URL provided by Infura RPC provider</p>

###### RPC_PROVIDER_GOERLI_URL:

<p>goerli URL provided by Infura RPC provider</p>

###### RPC_PROVIDER_SEPOLIA_URL:

<p>sepolia URL provided by Infura RPC provider</p>

###### RPC_PROVIDER_KEY:

<p>key provided by Infura RPC provider</p>

###### ETHERSCAN_KEY:

<p>key provided by Etherscan for contract code verification</p>

### web-app directory ".env"

###### REACT_APP_SUPPORTED_CHAINS:

<p>Ethereum lower-cased chain names separated by commas</p>
<p>These are the chains in which the app contracts are deployed, e.g.</p>
<pre><code>REACT_APP_SUPPORTED_CHAINS="mainnet,rinkeby"</pre></code>
<p>If only one chain is supported there should be no comma, e.g.</p>
<pre><code>REACT_APP_SUPPORTED_CHAINS="mainnet"</pre></code>

###### REACT_APP_CONTRACTS:

<p>Contract file names separated by commas</p>
<p>These should be cased exactly like the ".sol" file name, e.g.</p> 
<pre><code>REACT_APP_CONTRACTS="MyNFT,Market"</pre></code>
<p>If only one contract exists there should be no comma, e.g.</p>
<pre><code>REACT_APP_CONTRACTS="MyNFT"</pre></code>

###### REACT_APP_CONFIRMATION_BLOCKS:

<p>number (integer) of confirmation blocks before the app considers an action confirmed</p>

###### REACT_APP_CONFIRMATION_DELAY_SECONDS:

<p>number (integer) of seconds after confirmation block to allow back-end to act before the app retrieves new information</p>

###### REACT_APP_BACKEND:

<p>url of backend service (template section to be implemented)</p>

## Truffle Commands

<p>cd to root directory</p>

### Compile and Deploy Contracts

<pre><code>truffle migrate --reset --network $NETWORK_NAME</pre></code>
<p>where "NETWORK_NAME" is declared in truffle-config.js</p>

### Test Contracts

<pre><code>truffle develop</pre></code>
<pre><code>truffle test</pre></code>

###### or

<pre><code>truffle test --network $NETWORK_NAME</pre></code>
<p>where "NETWORK_NAME" is declared in truffle-config.js</p>

### Verify Contracts

<pre><code>truffle run verify $CONTRACT_NAME --network $NETWORK_NAME</pre></code>
<p>where "CONTRACT_NAME" is the name of your solidity contract file in /contracts/<br>
and "NETWORK_NAME" is declared in truffle-config.js</p>

## Web App Commands

<pre><code>cd web-app</pre></code>

### Run in Dev Mode

<pre><code>npm start</pre></code>

### Test

<pre><code>npm test</pre></code>

### Build

<pre><code>npm run build</pre></code>
