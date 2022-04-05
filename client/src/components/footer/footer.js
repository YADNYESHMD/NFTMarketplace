import React from "react";
import "./footer.css";

class Footer extends React.Component {
	render() {
        let credit
        if(this.props.devs == true) {
            credit = <span><a href="https://rahulmehta.dev" target="_blank"> Rahul Mehta </a> & <a href="#"> Mayank Thite</a></span>
        } else {
            credit = <a href="https://snapcert.io/" target="_blank"> Snapper Future Tech</a>
        }

		return (
			<div class="Footer">
                <footer class="page-footer font-small special-color-dark">
                    <div class="footer-copyright text-center py-3">
                            <p>© { new Date().getFullYear() } 
                                {credit}
                                . All rights reserved.
                            </p>
                    </div>
                </footer>
                {}
            </div>
		);
	}
}

export default Footer;