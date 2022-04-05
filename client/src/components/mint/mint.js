import React from 'react';
import "./mint.css";

import firebase from "../../firebase.js"

class Mint extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '',
            fontColor: '',
            imahe: null,
            fileName: 'Upload Image'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            bgColor: event.target.value,
            fontColor: this.invertColor(event.target.value)
        });
    }

    handleImageChange(event) {
        if(event.target.files[0] != undefined) {
            this.setState({
                fileName: event.target.files[0].name,
                image: URL.createObjectURL(event.target.files[0]),
                imageToUpload: event.target.files[0]
            })
        }
    }

    mintToken = (Name, Color, FontColor, Description,nftType,TokenURI, Price, DateTime) =>{
        // mint token
        this.props.mintToken(Name, Color, FontColor, Description,nftType ,TokenURI, this.state.fileName, Price, DateTime) //contract function call

        const res =fetch("/mint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            }),
          });

        // upload image to firebase
        let file = this.state.imageToUpload;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('token/' + file.name).put(file);  
      
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{

            },(error) =>{
                throw error
            },() =>{
                // Create a reference to the file whose metadata we want to change
                var forestRef = storageRef.child('token/' + file.name);
            
                // Create file metadata to update
                var metadata = {
                    customMetadata: {
                        'id': this.props.totalSupply,
                        'color': Color
                    }
                };

                // Update metadata properties
                forestRef.updateMetadata(metadata)
            }
        )
    }

    invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '000000'
                : 'FFFFFF';
    }

    render() {
        let displayImage
        if(this.state.image) {
            displayImage = <img class="mint-form-image" src={this.state.image}/>
        }
        return (
            <div class="Mint">
                <div class="welcome">
                    <h1 class="head">Create NFT</h1>
                    <form 
                        class="mint-token-form"
                        onSubmit={(event) => {
                        event.preventDefault()
                        const Name = this.Name.value
                        const Color = this.Color.value
                        const Description = this.Description.value
                        const nftType = this.nftType.value
                       
                        const TokenURI = 'minted-tokens/' + Color
                        const Price = this.Price.value
                        const FontColor = this.state.fontColor
                        var today = new Date()  //gives current date object
                        let DateTime = 
                            today.getDate() + ' ' 
                            + today.toLocaleString('default', { month: 'short' }) + ' ' 
                            + today.getFullYear() + ', ' 
                            + today.getHours() + ':' 
                            + today.getMinutes() + ':' 
                            + today.getSeconds()   //fetched required data from today obj
                        this.mintToken(Name, Color, FontColor, Description,nftType, TokenURI, Price, DateTime)
                    }}>
                        <div class="row">
                            <div class="col">
                                <label htmlFor="file-upload" class="custom-file-upload">
                                    <div class="upload">
                                        <i class="fa fa-cloud-upload"></i> {this.state.fileName}
                                        <input id="file-upload" type="file" onChange={this.handleImageChange} required/>
                                    </div>
                                    {displayImage}
                                </label>
                            </div>
                            <div class="col">
                                <input 
                                    type="text" 
                                    ref={(input) => { this.Name = input }} 
                                    class="form-control form-control-lg" 
                                    placeholder="NFT Name*" autoFocus required/>
                                
                                <div class="custom-row">
                                    <input class="disabled-input" value="#" disabled />
                                    <input 
                                        type="text" 
                                        ref={(input) => {this.Color = input}} 
                                        onChange={this.handleChange}
                                        class="form-control form-control-lg custom-margin" 
                                        pattern="([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                                        style={{
                                            'backgroundColor': '#'+this.state.bgColor,
                                            'color': '#'+this.state.fontColor,
                                            'transition': 'all 200ms ease-out',
                                            'marginRight': '20px'
                                        }}
                                        maxLength="6"
                                        placeholder="Color hex*" required/>
                                
                                    <input class="disabled-input ether-icon" value="" disabled />
                                    <input 
                                        type="number"
                                        step="0.01"
                                        pattern="[0-9]" 
                                        ref={(input) => { this.Price = input }} 
                                        class="form-control form-control-lg custom-margin" 
                                        placeholder="Price (ETH)*" required/>
                                    
                                </div>
                                <select 
                                        type="text"
                                        ref={(input) => { this.nftType = input }} 
                                        class="form-control form-control-lg custom-margin" 
                                        style={{"margin-top":0}}
                                       
                                        placeholder="Type" required>
                                            <option>NFT Type</option>
                                            <option>Sports</option>
                                            <option>Art</option>
                                            <option>TradingCards</option>
                                            <option>Photography</option>
                                        </select>

                                    <input 
                                    type="text"
                                    ref={(input) => { this.userurl = input }} 
                                    class="form-control form-control-lg custom-margin" 
                                    style={{"margin-top":0}}
                                    placeholder="External link to your content"/>

                                <textarea 
                                    type="text" 
                                    ref={(input) => {this.Description = input}} 
                                    class="form-control form-control-lg" 
                                    placeholder="NFT Desciption*" required>
                                </textarea>
                                <select 
                                        type="text"
                                        ref={(input) => { this.blckchain = input }} 
                                        class="form-control form-control-lg custom-margin" 
                                        style={{"margin-top":20}}
                                       
                                        placeholder="Type" required>
                                            {/* <option>Select Blockchain</option> */}
                                           
                                            <option>Ethereum</option>
                                            
                                        </select>
                            </div>
                        </div>
                        <input 
                            type="submit" 
                            value="Create Token" 
                            class="MintButton btn-primary" 
                            style={{"margin-top":40}}
                            />
                    </form>
                </div>
            </div>
        );
    }
}
export default Mint;