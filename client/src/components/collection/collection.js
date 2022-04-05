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
import Detailmodal from "./cmodal.js";
import "./collection.css"

import { margin } from "@mui/system";

class Collection extends React.Component {
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
            //console.log("in here");
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
        console.log(this.props);

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
        this.setState({ collection: ty });
        console.log(ty, this.state)

    }
    
    render() {
        const { urlImgs } = this.state;

        return (
            <div class=" minted-tokens ">
                <h1 style={{ "margin-top": 20 }}>Collections</h1>
                {/* <label
                    style={{ "margin-right": 1000, "margin-top": 10 }}
                >Select Collection</label> */}
<select
    type="text"
    ref={(input) => { this.nftType = input }}
    class=" form-control-lg custom-margin"
    // style={{ "margin-right": 1100, "margin-top": 0 }}
    onChange={this.changeSelectOptionHandler}
    placeholder="search Type" required>
    <option>All</option>
    {this.props.tokens.map((token, key) => {
        return (

            <option key={key} value={token.collection}>
                {token.collection}
            </option>
        );

    })}
</select>

    

<div class="row" style={{ "margin-left":0 }}>
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
        if (
            token.to != this.props.account &&
            token.to != "0x0000000000000000000000000000000000000000" &&
            token.collection == this.state.collection

        ) {
            token.name.length >= 17
                ? (name = token.name.slice(0, 17) + "...")
                : (name = token.name);
            token.description.length >= 24
                ? (description = token.description.slice(0, 24) + "...")
                : (description = token.description);

            return (
                
                <div onClick={this.onClickButton.bind(this, token, urlImgs[key])}>

                        <div class="container mt-3 mb-3 p-2 d-flex justify-content-center">
                            <div class="card p-2">
                            
                                <div class=" image d-flex flex-column justify-content-center align-items-center">
                                        <button class="btn btn-secondary"> 
                                        {/* <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /> */}
                                        <div
                            class="card-img-top"
                            style={{

                                // backgroundColor: "#" + token.color,
                                height:100, width:100,
                              
                               
                            }}
                        >
                            {loader}
                        </div>
                                        </button> <span class="card-text">{token.name}</span> 
                                        <span class="card-text">@ 14M followers</span>
                                    {/* <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                    <span><i class="fa fa-copy"></i></span> </div>
                                    <div class="d-flex flex-row justify-content-center align-items-center mt-3"> 
                                    <span class="card-text"><span class="follow">{description}</span>
                                    </span> </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
            );
        }
        else if (this.state.collection == '' || this.state.collection == 'All') {
            {
                token.name.length >= 17
                    ? (name = token.name.slice(0, 17) + "...")
                    : (name = token.name);
                token.description.length >= 24
                    ? (description = token.description.slice(0, 24) + "...")
                    : (description = token.description);

                return (
                    <div onClick={this.onClickButton.bind(this, token, urlImgs[key])}>

                        <div class="container mt-3 mb-3 p-2 d-flex justify-content-center">
                            <div class="card p-2">
                            
                                <div class=" image d-flex flex-column justify-content-center align-items-center">
                                        <button class="btn btn-secondary"> 
                                        {/* <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /> */}
                                        <div
                            class="card-img-top"
                            style={{

                                // backgroundColor: "#" + token.color,
                                height:100, width:100
                            }}
                        >
                            {loader}
                        </div>
                                        </button> <span class="card-text">{token.collection}</span> 
                                        <span class="card-text">@ 14M followers</span>
                                    {/* <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                    <span><i class="fa fa-copy"></i></span> </div>
                                    <div class="d-flex flex-row justify-content-center align-items-center mt-3"> 
                                    <span class="card-text"><span class="follow">{description}</span>
                                    </span> </div> */}
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
export default Collection;
