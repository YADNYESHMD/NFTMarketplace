import React from "react";
import "./transfer.css";

class Transfer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    token: {},
  };
  setToken(token) {
    this.setState({ token: token });
  }
  sell1 = async (token1, ReceivingAddress) => {
    {
      //console.log(this.props);
      this.props.tokens.map((token, key) => {
        if (token1 == token.id) {
          console.log(token);
          const mysell = {
            mytoken: token,
            receiver_address: ReceivingAddress,
          };

          const { mytoken, receiver_address } = mysell;

          fetch("/transfer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mytoken,
              receiver_address,
            }),
          });

         
        }
      });
    }
    window.alert(`You have sent the token to ${ReceivingAddress} `);
    console.log(this.state.token);
   
  };
  render() {
    return (
      <div class="Transfer">
        <div class="welcome">
          <h1 class="head">Transfer Tokens to another account</h1>
          <form
            class="transfer-token-form"
            onSubmit={(event) => {
              event.preventDefault();
              const ReceivingAddress = this.ReceivingAddress.value;
              const Token = this.TokenID.value;
              this.sell1(Token, ReceivingAddress);
            }}
          >
            <input
              type="text"
              class="form-control form-control-lg custom-margin custom-width"
              placeholder={this.props.account}
              disabled
            />
            <input
              type="text"
              class="form-control form-control-lg custom-margin"
              placeholder="Enter receiving address"
              ref={(input) => {
                this.ReceivingAddress = input;
              }}
              required
            />
            <select
              class="form-control form-control-lg custom-margin"
              ref={(input) => {
                this.TokenID = input;
              }}
              required
            >
              {this.props.tokens.map((token, key) => {
                if (this.props.account == token.to) {
                  return (
                    <option key={key} value={token.id}>
                      {token.name}
                    </option>
                  );
                }
              })}
            </select>
            <input
              type="submit"
              value="Transfer Token"
              class="MintButton btn-primary"
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Transfer;
