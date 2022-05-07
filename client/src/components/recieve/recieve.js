import React from "react";
//import "./recieve.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ether from "../../assets/ether.svg";

import firebase from "../../firebase.js";
import axios from "axios";
import Detailmodal from "./modalrec";

class Recieve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      openModal: false,
      urlImgs: [],
      ethPrice: 0,
      data: [],
    };
    this.requests();
  }

  requests = async (req, res) => {
    const myaddress = { receiver_address: this.props.account };
    console.log(myaddress);

    const { receiver_address } = myaddress;
    //console.log(receiver_address);
    const response = await fetch("/recieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receiver_address,
      }),
    })
      .then((response) => response.json())
      .then((result) => this.setState({ data: result }));

    console.log(this.state.data);
  };

  componentDidMount() {
    console.log(this.props.tokens)

    const { tokens } = this.props;

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
  async getTokenImage(fileName) {
    if (!fileName) {
    } else {
      const ref = firebase.storage().ref("token/" + fileName);
      const url = await ref.getDownloadURL();
      console.log("in here");
      return url;
    }
  }
  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  onClickButton = (token, url) => {
    token.ethPrice = this.state.ethPrice;
    token.url = url;
    this.setState({
      openModal: true,
      token: token,
    });
  };

  render() {
    const { urlImgs } = this.state;
    

    //from Home
    return (
      <div class="welcome minted-tokens ">
        <div class="row">
          {this.state.data.map((token, key) => {
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
            if (
              token.to != this.props.account &&
              token.to != "0x0000000000000000000000000000000000000000"
            ) {
              
              return (
                <div
                  onClick={this.onClickButton.bind(
                    this,
                    token.mytoken,
                    urlImgs[key]
                  )}
                >
                  {/* <button >a</button> */}

                  <div class="token-id">{token.mytoken.id}</div>
                  <div class="card card-width">
                    <div
                      class="card-img-top"
                      style={{
                        backgroundColor: "#" + token.mytoken.color,
                      }}
                    >
                      {loader}
                    </div>
                    <h5
                      class="card-header"
                      style={{
                        backgroundColor: "#" + token.mytoken.color,
                        color: "#" + token.mytoken.fontColor,
                      }}
                    >
                      {token.mytoken.name}
                    </h5>
                    <div class="card-body">
                      <p class="card-text">{token.mytoken.description}</p>
                      <div class="foot-of-card">
                        <span class="row price-row">
                          <img src={ether} alt="ether" class="icon" />
                          <p class="card-text">{token.mytoken.price}</p>
                        </span>
                        <p class="card-text datetime">
                          {token.mytoken.dateTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
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
export default Recieve;
