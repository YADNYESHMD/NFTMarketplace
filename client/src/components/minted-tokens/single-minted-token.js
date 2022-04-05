import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import ether from '../../assets/ether.svg'

import firebase from "../../firebase.js"
import axios from 'axios';

class SingleMintedTokens extends React.Component {

    state = {
        token: {},
        ethPrice: 0,
        tokenImageUrl: null,
        displayDesc: false
    }

    componentDidMount() {
        let colorExist = this.setTokenDetails(this.props.color)
        if(!colorExist) {
            console.log('Error 404, Token not found!')
        } else {
            this.getEthValue()
        }
    }

    async getTokenImage() {
        const ref = firebase.storage().ref('token/' + this.state.token.fileName);
        const url = await ref.getDownloadURL();
        this.setState({
            tokenImageUrl: url
        })
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

    setTokenDetails = (color) => {
        var colorExist = false
        this.props.tokens.map((token) => {
            if(token.color == color) {
                this.setState({
                    token: {
                        color: token.color,
                        dateTime: token.dateTime,
                        description: token.description,
                        fontColor: token.fontColor,
                        id: token.id,
                        name: token.name,
                        price: token.price,
                        to: token.to,
                        tokenURI: token.tokenURI,
                        fileName: token.fileName
                    }
                })
                colorExist = true
            }
        });
        if(colorExist) {
            return true
        } else {
            return false
        }
    }

    render() {
        let token = this.state.token,
            loader
        if (this.state.tokenImageUrl != null) {
            loader = <div 
                        class="card-img-top single-token-image" 
                        style={{ backgroundImage: 'url('+this.state.tokenImageUrl+')'}}></div>
        } else {
            loader = <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
        }
        this.getTokenImage()
        return (
            <div class="minted-tokens" style={{'margin': '4em 12vw'}}>
                <div></div>
                <div class="row">
                    <div class="col">
                        {loader}
                    </div>
                    <div class="col token-details">
                        <h1 class="token-name">{token.name}</h1>

                        <p class="card-text">Token owned by <span class="owner-address">{token.to}</span></p>

                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{height:40}}>
                                        <i class="fas fa-tags"></i>
                                        Current Price
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    <div class="row" style={{padding: '0 12.8px', justifyContent: 'end'}}>
                                        <img src={ether} alt="ether" class="icon" />
                                        <p class="card-text token-price">{token.price}</p>
                                        <p class="card-text token-price-usd">($ {parseInt(token.price) * this.state.ethPrice} )</p>
                                    </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{height:40}}>
                                        <i class="fas fa-file-alt"></i>
                                        Description
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body class="card-body description-body">
                                        {/* <div class="token-color" style={{backgroundColor: '#'+token.color}}>
                                            <p style={{color: '#'+token.fontColor}}>#{token.color}</p>
                                        </div> */}
                                        <p class="card-text">{token.description}</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{height:40}}>
                                        <i class="fas fa-info-circle"></i>
                                        Properties
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body class="token-properties">
                                        <div class="property-name">
                                            <p>Token ID</p>
                                        </div>
                                        <div class="property-value">
                                            <p>{token.id || 'Missing'}</p>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}
export default SingleMintedTokens;