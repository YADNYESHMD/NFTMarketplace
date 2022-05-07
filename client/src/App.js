import React, { Component } from "react";
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

// contract import
import myToken from "./contracts/myToken.json";

// import components
import Navbar from "./components/navbar/navbar.js";
import Home from "./components/home/home.js";
import Mint from "./components/mint/mint.js";
import Burn from "./components/burn/burn.js";
import Recieve from "./components/recieve/recieve.js";
import Collection from "./components/collection/collection.js";
import Transfer from "./components/transfer/transfer.js";
import MintedTokens from "./components/minted-tokens/minted-tokens.js";
import Footer from "./components/footer/footer.js";

// includes
import "./App.css";

class App extends Component {


  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    //for ethereum browser
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      //for legacy browsers
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      //for invalid response
    } else {
      window.alert("Non-ethereum browser detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts(); //load accounts
    this.setState({ account: accounts[0] }); //setting account => store a/c in state obj. in react

    window.ethereum.on(
      "accountsChanged",
      async function () {
        // Time to reload your interface with accounts[0]!
        const accounts = await web3.eth.getAccounts(); //load accounts
        this.setState({ account: accounts[0] }); //setting account => store a/c in state obj. in react
      }.bind(this)
    );

    //loading contracts
    const networkId = await web3.eth.net.getId();
    const networkData = myToken.networks[networkId]; //myToken is contract

    if (networkData) {
      const abi = myToken.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      console.log("This is Contract")
      console.log(contract)
      this.setState({ contract: contract });
      const totalSupply = await contract.methods.getTokenCount().call(); //.call() is used to read data from blockchain
      this.setState({ totalSupply: totalSupply });

      // load colors => ref. test case
      for (let i = 1; i <= totalSupply; i++) {
        const Token = await contract.methods.arr_NFT(i - 1).call();
        this.setState({
          tokens: [...this.state.tokens, Token], //spread operator => creates new copy of array with new colors appended to it
        });
      }
      // .call() is used to read data from blockchain


      // load colors => ref. test case

    } else {
      window.alert("Smart contract not deployed to detected network");
    }
  }
  //mint function from contract call
  mintToken = (Name, Color, FontColor, Description, nftType, TokenURI, fileName, Price, DateTime) => {
    this.state.contract.methods.mintNFTS(Name, Color,FontColor, nftType, TokenURI, Description,DateTime, fileName, Price).send({ from: this.state.account }).once("receipt", (receipt) => {
      let token = {
        id: this.state.totalSupply,
        name: Name,
        color: Color,
        nftType : nftType,
        fontColor: FontColor,
        description: Description,
        tokenURI: TokenURI,
        fileName: fileName,
        price: Price,
        dateTime: DateTime,
        to: this.state.account,
      };
      this.setState({
        tokens: [...this.state.tokens, token],
        totalSupply: parseInt(this.state.totalSupply) + 1,
      });
    });
  };

  //buy function from contract call
  buy = (id) => {
    this.state.contract.methods.BuyToken(id).send({from: this.state.account})
    
  };

  // transfer function from contract call for sell& receive
  transferToken = () => { };

  //burn function from contract call
  burnToken = (id) => { 
    this.state.contract.methods.burnNFT(id).send({from: this.state.account})
  };

  countClicks = () => { };


  constructor(props) {
    super(props);
    this.state = {
      account: "", //empty string in the beginning
      contract: null, //no deployed contract initially
      totalSupply: 0, //initial supply to zero
      tokens: [], //empty color array
      count: 0,
      devs: false,
    };
  }


  render() {
    return (
      <div className="App frontPage">
        <Navbar account={this.state.account} />
        <Router>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark link-bar"
            onClick={this.countClicks}
          >
            <ul className="navbar-nav mr-auto">
              <li class="nav-link">
                <NavLink exact to={"/"} activeClassName="is-active">
                  {" "}
                  Home{" "}

                </NavLink>
              </li>
              <li class="nav-link">
                <NavLink to={"/mint"} activeClassName="is-active">
                  {" "}
                  Create NFTs{" "}
                </NavLink>
              </li>
              <li class="nav-link">
                <NavLink to={"/minted-tokens"} activeClassName="is-active">
                  My NFTs
                </NavLink>
              </li>
              <li class="nav-link">
                <NavLink to={"/transfer"} activeClassName="is-active">
                  Sell
                </NavLink>
              </li>
              <li class="nav-link">
                <NavLink to={"/burn"} activeClassName="is-active">
                  Burn
                </NavLink>
              </li>
              <li class="nav-link">
                <NavLink to={"/recieve"} activeClassName="is-active">
                  Recieve
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Home
                  account={this.state.account}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                  buy={this.buy}
                />
              )}
            />
            <Route
              path="/mint"
              component={() => (
                <Mint
                  mintToken={this.mintToken}
                  totalSupply={this.state.totalSupply}
                  account={this.state.account}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                />
              )}
            />
            <Route
              path="/recieve"
              component={() => (
                <Recieve
                  mintToken={this.mintToken}
                  totalSupply={this.state.totalSupply}
                  account={this.state.account}
                  buy={this.buy}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                />
              )}
            />

            <Route
              path="/burn"
              component={() => (
                <Burn
                  burnToken={this.burnToken}
                  account={this.state.account}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                />
              )}
            />
            <Route
              path="/transfer"
              component={() => (
                <Transfer
                  transferToken={this.transferToken}
                  account={this.state.account}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                />
              )}
            />
            <Route
              path="/minted-tokens"
              render={() => (
                <MintedTokens
                  account={this.state.account}
                  contract={this.state.contract}
                  tokens={this.state.tokens}
                />
              )}
            />
          </Switch>
        </Router>
        <Footer devs={this.state.devs} />
      </div>
    );
  }
}

export default App;
