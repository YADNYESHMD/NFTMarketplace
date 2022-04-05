import React from 'react';
import "./burn.css";

class Burn extends React.Component {
    render() {
        return (
            <div class="Burn">
                <div class="welcome">
                    <h1 class="head">Burn Token</h1>
                    <form
                        class="transfer-token-form"
                        onSubmit={(event) => {
                        event.preventDefault()
                        const TokenID = this.TokenID.value
                        this.props.burnToken(TokenID) //contract function call
                    }}>
                        <input type = "text" 
                        class="form-control form-control-lg"
                        ref={(input) => {this.TokenID = input}}  
                        placeholder="Enter Burn ID" autoFocus required/>

                        <input type="submit" value="Burn Token" class="MintButton btn-primary" />
                    </form>
                </div>
            </div>
        );
    }
}
export default Burn;