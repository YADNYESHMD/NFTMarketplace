import React from "react";
import "./navbar.css";

class Navbar extends React.Component {

	render() {
        let metamask;
        if(this.props.account) {
            metamask = this.props.account;
        } else {
            metamask = 'Connect to Metamask';
        }
		return (
			<div className="Navbar">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand company" href="/">
                        <div class="logo"></div>
                        <h3>CosmoPedia!</h3>
                    </a>
                    <div className="connection">
                        <div class="metamask"></div>
                        {metamask}
                    </div>
                </nav>
            </div>
		);
	}
}

export default Navbar;