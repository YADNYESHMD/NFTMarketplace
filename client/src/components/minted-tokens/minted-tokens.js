import React from 'react';
import "./minted-tokens.scoped.css";

import MultipleMintedTokens from './multiple-minted-tokens.js';
import SingleMintedTokens from './single-minted-token.js';

class MintedTokens extends React.Component {

    render() {
        const color = window.location.pathname.split('/')[2]
        let display
        if(color == undefined) {
            display = <MultipleMintedTokens 
                        account={this.props.account}    
                        tokens={this.props.tokens}></MultipleMintedTokens>
        } else {
            display = <SingleMintedTokens
                        account={this.props.account} 
                        color={color} 
                        tokens={this.props.tokens}></SingleMintedTokens>
        }
        return (
            <div class="Minted-Token">
                {display}
            </div>
        );
    }
}
export default MintedTokens;