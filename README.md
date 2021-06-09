<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>multisig-sample-app</code></h3>
<p align="middle">
  Sample application for the RIF Savings and Vault project
</p>
<p align="middle">
  <a href="https://circleci.com/gh/rsksmart/react-app-rif-template">
    <img src="https://img.shields.io/circleci/build/github/rsksmart/react-app-rif-template?label=CircleCI" alt="npm" />
  </a>
  <a href="https://lgtm.com/projects/g/rsksmart/react-app-rif-template/alerts/">
    <img src="https://img.shields.io/lgtm/alerts/github/rsksmart/react-app-rif-template" alt="Alerts">
  </a>
  <a href="https://lgtm.com/projects/g/rsksmart/react-app-rif-template/context:javascript">
    <img src="https://img.shields.io/lgtm/grade/javascript/github/rsksmart/react-app-rif-template" alt="Code Quality">
  </a>
</p>

## Developer Resources:

This repo contains many of the functions available from the RSK Safe Factory SDK. Below is a list of the methods and where they are implemented.

### Setup:

The SDK uses etheres to connect with the web3Provider. Many of the examples below assume that you have a provider and/or a signer available. In this repo we are using [rLogin](https://github.com/rsksmart/rlogin) to get the web3Provider.

```
import { ethers } from 'ethers'
// ...
const provider = new ethers.providers.Web3Provider(web3Provider)
const signer = provider.getSigner()
```

### Creating and connecting

* `createSafe({ addresses, threshold })` - create a safe with addresses and threshold for executing transactions. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/connectToSafe/index.tsx#L36)
* `create(etheres, safeAddress, signer)` - connect to a deployed safe. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/connectToSafe/index.tsx#L49)

### Query the safe

* `safe.getBalance().then(console.log)` - Returns a promise of the balance of the safe. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/Dashboard.tsx#L13)
* `safe.getAddress()` - Returns the safe address. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/Dashboard.tsx#L23)
* `safe.getOwners()` - Returns a promise with an array of addresses who are the owners of the safe. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L29)
* `safe.getThreshold()` - Returns a promise with the number of signatures required to execute a transaction. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L30)

### Policy Updates

All of the following return a transaction that needs to be signed and then executed (see under transactions).

* `getChangeThresholdTx(number)` - Change the number of signers required to execute a transaction. [Code example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L35)
* `getAddOwner(address, threshold)` - Add an owner and update the threshold if needed. [Code example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L44)
* `getRemoveOwnerTx(address, threshold)` - Remove an owher and update the threshold if needed. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L53)
* `getSwapOwnerTx(address)` - Swap one owner for another. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/policies/index.tsx#L62)

### Transactions

* `createTransaction({ to, value, nonce, data })` - Create a transaction. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/transactions/index.tsx#L30) 
* `approveTransactionHash(txHash)` - approve a transaction **on-chain** using its hash. See example on how to get the hash of a transaction. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/transactions/index.tsx#L43)
* `executeTransaction(transaction)` - execute a transaction that has the proper number of approvers. [Code Example](https://github.com/rsksmart/multisig-sample-app/blob/main/src/pages/safeInteraction/transactions/index.tsx#L49) 



## Available Scripts

### `yarn`

Install project dependencies

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Runs the tests, displays coverage, and runs the linter. See below for more specific commands

#### `yarn test:watch`

Launches the test runner in the interactive watch mode.

#### `yarn test:coverage`

Runs the test coverage and saves the report in the`coverage` folder.

#### `yarn lint`

Runs the linter and returns status.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### CI scripts

#### `yarn test:ci`

Runs the test coverage and saves the report in the`reports` folder. Uses `maxWorkers=2` - CircleCI recommendation

#### `yarn test:ci`

Runs the linter and saves the report in the`reports` folder.

## Knowledge base

This project was bootstrapped with the Typescript tempalte of [Create React App](https://github.com/facebook/create-react-app) and added Eslint, CircleCI, and Enzyme testing utility.

Current React.js version: `v17.0.1`, but Enzyme is set up for `v16` - this will be upgraded when Enzyme releases a new version.
