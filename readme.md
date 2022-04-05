![CosmoPedia](https://github.com/RTM909/cosmopedia/raw/master/client/src/assets/cosmo.png "CosmoPedia")
# CosmoPedia!

## *Creating and Transferring NFTs using ERC721 Token Standard*
 
 ## Description 
 NFT or a Non-Fungible Token is a unique asset that lives in the crypto space. NFT differs from the regular tokens (Fungible) based on its uniqueness. This Dapp (Decentralized Application) lets you mint, view, and transfer your NFT with a few clicks. The project is powered by the OpenZeppelin ERC721 library. It consists of a back-end written in Solidity and the front-end powered by React. 
 If you want to know more about the specific resources used in the project please find the links for all of them below 

 ## Functions Included 
 
- Web3 Library & MetaMask 
- Minting an Image File (JPG, PNG) into an NFT 
- Rendering the minted NFTs on front-end 
- Storing the images with metadata on Google's Firebase cloud 
- Buying the NFT's
- Selling the NFT to an Ethereum Address of choice and Receiving the NFT's 
- Removing (burning) the NFT 
- Multiple Account support through MetaMask included 
 

## Dependencies 
This app uses React, Solidity, Web3, MongoDB and NodeJS
- [Node Js](https://nodejs.org/en/download/) - Network Architecture
- [Truffle](https://www.trufflesuite.com/truffle) - Framework
- [Ganache](https://www.trufflesuite.com/ganache) - Creation of Private Blockchain 
- [React](https://reactjs.org/docs/getting-started.html) - Front-End 
- [Firebase](https://firebase.google.com/)  - Database Storage Provider
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) - Database Storage Provider
- [Solidity Ver 8+](https://docs.soliditylang.org/en/v0.8.4/) - Back-End 
- [MetaMask](https://metamask.io/download) - Wallet & web3 provider 


## Setup (windows demo environment) 
 
- Download the project 
- Next, do this 
1. At Root : Do `npm install`
2. At serve dir: Do `npm install`
3. At client dir: Do `npm install`
 - **You need to add your API Key details for Firebase storage to work**
 - Please refer to the following [docs](https://firebase.google.com/docs/storage/web/start) to retrieve your firebase code
 - Please add your firebase details in `firebase.js`
- After the dependencies are successfully installed open `Ganache`
- Quickstart a new Ethereum environment 
- Now check the RPC server for the port number, it should look something like `http://127.0.0.1:3454` in which `3454` is the port number
- Verify it in the `truffle-config.js` file in the project 
# To Run the project: 
Ganache has to be running in the background
1. At Root : Do `truffle migrate`
2. At database dir: Do `nodemon ./index.js`
3. At client dir: Do `npm run start`
  - This will open a browser window with your Dapp running 
  

### Connecting MetaMask to Dapp 
1. Install the [MetaMask](https://metamask.io/download) browser extension
2. Setup a new wallet account
3. Go to Ganache and copy the `RPC Server` Address in the top panel
   > You need this to import your Ganache Blockchain into MetaMask
4. Go to MetaMask and click on the networks tab (This should be selected as Ethereum Mainnet or some testnet such as Rinkeby)
5. Select `Custom RPC` in this tab at the bottom
6. Enter the name of your choice, the `RPC Address` that you copied, and `1337` as the chain ID
7. Other details should be auto-filled after entering the above details
8. Click on save and you should have the Ganache network in your MetaMask now
9. Then go to Ganache and click on the 🔑  on the right of the account number
10. Copy the `Private Key` which would look something like this 
  ```
  357e626beea4019ee4ca96c1234ed52e390b71c6db0c64d15cdee1cc68a57aef
  ```
11. Now open MetaMask and click on your account image and click `Import account`
12. Paste the copied private key in this and press on `Import`
 > Note: The `Quickstart Ethereum` you started in Ganache is temporary and every account that was generated will be lost forever once you close Ganache. You will have to do the steps `9 to 12` every time you open ganache. You will have to save the Workspace in Ganache if you wish to prevent this.
- Now reload the page
- MetaMask should popup asking you to connect your account
- If you connected successfully, your wallet address should be visible in the top right of the app. E.g.: `0xC9b87aeC184293A1D6d79806c8a0D70921090921`

### License
**MIT**

# For Modular Project Development
1. Contracts Development:  in contract directory
2. Migration of contract: in migrations
3. Contract Integartion and Contract function call: client->src->App.js
4. Contract function call: client-> src->components->mint/burn/collection->mint.js/burn.js/cmodal.js(using props)