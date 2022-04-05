import React from 'react';
import ether from '../../assets/ether.svg'
import firebase from "../../firebase.js"
import { Link } from 'react-router-dom';

class MultipleMintedTokens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlImgs: [],
        };
    }
  
    async getTokenImage(fileName) {
        if(!fileName){}
        else{
        const ref = firebase.storage().ref('token/' + fileName);
        const url = await ref.getDownloadURL();
        console.log('in here')
        return url
        }
    }
  
    componentDidMount() {
        const { tokens } = this.props;
        const promiseArray = tokens.map((token) => this.getTokenImage(token.fileName));
        Promise.all(promiseArray)
        .then(valueArray => {
            this.setState(prevState => ({
                ...prevState,
                urlImgs: valueArray
            }))
        })
        .catch(err => console.log(err));
    }
  
    render() {
        const { urlImgs } = this.state;
        
        return (
            <div class="welcome minted-tokens">
                <h1 class="">Minted Tokens</h1>
                <div class="row">
                    {this.props.tokens.map((token, key) => {
                        let name = '', description = '',
                            loader
                        if (urlImgs[key]) {
                            loader = <div
                                        class="card-img-top"
                                        style={{
                                            backgroundImage: `url(${urlImgs[key]})`,
                                            backgroundPosition: 'center' 
                                        }}></div>
                        } else {
                            loader = <div 
                                        class="lds-ring" 
                                        style={{
                                            position: 'relative',
                                            top: '55%'
                                        }}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                        }
                        if(token.to == this.props.account) {
                            token.name.length >= 17 ? name = token.name.slice(0,17) + '...' : name = token.name
                            token.description.length >= 24 ? description = token.description.slice(0,24) + '...' : description = token.description
                            
                            return (
                                <Link to={token.tokenURI} key={key}>
                                    <div class='token-id'>{token.id}</div>
                                    <div class="card card-width">
                                        <div class="card-img-top" style={{
                                            backgroundColor: '#'+token.color,
                                        }}>
                                            {loader}
                                        </div>
                                        <h5 class="card-header" style={{
                                            backgroundColor: '#'+token.color,
                                            color: '#'+token.fontColor}}>{name}</h5>
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
                                </Link>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}
export default MultipleMintedTokens;