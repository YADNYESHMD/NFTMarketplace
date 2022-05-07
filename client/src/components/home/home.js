import React from "react";
import ether from "../../assets/ether.svg";
import firebase from "../../firebase.js";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
//import Button from '@mui/material/Button';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import cors from "cors";
import Collection from "../collection/collection";
import Detailmodal from "./modal.js";

import { margin } from "@mui/system";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      openModal: false,
      urlImgs: [],
      collection: "",
      nfttype: '',
      ethPrice: 0,
    };
  }

  async getTokenImage(fileName) {
    if (!fileName) {
    } else {
      const ref = firebase.storage().ref("token/" + fileName);
      const url = await ref.getDownloadURL();
      console.log("in here", this.props.account);
      return url;
    }
  }

  onClickButton = (token, url) => {
    token.ethPrice = this.state.ethPrice;
    token.url = url;
    this.setState({ openModal: true, token: token });
  };

  onCloseModal = () => {

    this.setState({ openModal: false });
  };

  componentDidMount() {
    const { tokens } = this.props;
    console.log(this.state);
    this.getEthValue();
    const promiseArray = tokens.map((token) =>
      this.getTokenImage(token.fileName)
    );
    Promise.all(promiseArray)
      .then((valueArray) => {
        this.setState((prevState) => ({
          ...prevState,
          urlImgs: valueArray,
        }));
      })
      .catch((err) => console.log(err));
  }

  getEthValue = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=f7cf3825ab0a0088ab70845faeb89b90fc1625635b2adb9b989a8a3b5dfc363f"
      )
      .then((response) => {
        // const usd = response.data.ticker.price;
        // this.setState({ ethPrice: usd });
        const usd = response.data.ETH.USD;
        this.setState({ ethPrice: usd });
        console.log(this.state.ethPrice);
      })
      .catch((err) => console.log(err));
  };

  changeSelectOptionHandler = (event) => {
    let ty = event.target.value
    this.setState({ nfttype: ty });
    console.log(this.state)

  }
  render() {
    const { urlImgs } = this.state;

    return (
      <div class="welcome minted-tokens ">
        <div>
          {/* <label
      style={{"margin-right":1100,"margin-top":10}}
      >Collections</label> */}
          <label
            style={{ "margin-right": 1110, "margin-top": 10 }}
          ></label>
          <select
            type="text"
            ref={(input) => { this.nftType = input }}
            class=" form-control-lg custom-margin"
            style={{
              "margin-right": 1100, "margin-top": 0, color: "chocolate",
              width: 170, height: 50,
              fontSize: 18,
              fontFamily: 'inherit',
              borderRadius: 10,
              backgroundColor: "whitesmoke"
            }}
            onChange={this.changeSelectOptionHandler}
            placeholder="search Type" required>
            <option >Explore</option>
            <option>All</option>
            <option>Sports</option>
            <option>Art</option>
            <option>TradingCards</option>
            <option>Photography</option>
          </select>

        </div>


        <div class="row" style={{ "margin-left": 100 }}>

          {this.props.tokens.map((token, key) => {
            let name = "",
              description = "",
              loader;
            if (urlImgs[key]) {
              loader = (
                <div
                  class="card-img-top"
                  style={{
                    backgroundImage: `url(${urlImgs[key]})`,
                    backgroundPosition: "center",
                  }}
                ></div>
              );
            } else {
              loader = (
                <div
                  class="lds-ring"
                  style={{
                    position: "relative",
                    top: "55%",
                  }}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              );
            }
            if (token.to != this.props.account &&
              token.to != "0x0000000000000000000000000000000000000000" && token.bought == false ||
              token.to == '') {
              if (token.nftType == this.state.nfttype) {
                token.name.length >= 17
                  ? (name = token.name.slice(0, 17) + "...")
                  : (name = token.name);
                token.description.length >= 24
                  ? (description = token.description.slice(0, 24) + "...")
                  : (description = token.description);

                return (
                  <div onClick={this.onClickButton.bind(this, token, urlImgs[key])} style={{ "margin-right": 20 }}>

                    {/* <button >a</button> */}

                    <div class="token-id">{token.id}</div>
                    <div class="card card-width">
                      <div
                        class="card-img-top"
                        style={{
                          backgroundColor: "#" + token.color,
                        }}
                      >
                        {loader}
                      </div>
                      <h5
                        class="card-header"
                        style={{
                          backgroundColor: "#" + token.color,
                          color: "#" + token.fontColor,
                        }}
                      >
                        {name}
                      </h5>
                      <div class="card-body">
                        <p class="card-text">{description}</p>
                        <div class="foot-of-card">
                          <span class="row price-row">
                            <img src={ether} alt="ether" class="icon" />
                            <p class="card-text">{token.price}</p>
                          </span>
                          <p class="card-text datetime">{token.dateTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              {
                token.name.length >= 17
                  ? (name = token.name.slice(0, 17) + "...")
                  : (name = token.name);
                token.description.length >= 24
                  ? (description = token.description.slice(0, 24) + "...")
                  : (description = token.description);

                return (
                  <div onClick={this.onClickButton.bind(this, token, urlImgs[key])} style={{ "margin-right": 20 }}>

                    {/* <button >a</button> */}

                    <div class="token-id">{token.id}</div>
                    <div class="card card-width">
                      <div
                        class="card-img-top"
                        style={{
                          backgroundColor: "#" + token.color,
                        }}
                      >
                        {loader}
                      </div>
                      <h5
                        class="card-header"
                        style={{
                          backgroundColor: "#" + token.color,
                          color: "#" + token.fontColor,
                        }}
                      >
                        {name}
                      </h5>
                      <div class="card-body">
                        <p class="card-text">{description}</p>
                        <div class="foot-of-card">
                          <span class="row price-row">
                            <img src={ether} alt="ether" class="icon" />
                            <p class="card-text">{token.price}</p>
                          </span>
                          <p class="card-text datetime">{token.dateTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

            }
          })}

          <div>
            <Detailmodal
              account={this.props.account}
              open={this.state.openModal}
              onClose={this.onCloseModal}
              token={this.state.token}
              buy={this.props.buy}
            ></Detailmodal>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
