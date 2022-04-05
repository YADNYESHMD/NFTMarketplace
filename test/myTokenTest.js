const Token = artifacts.require("myToken")

const chai = require("./setupchai.js")
const BN = web3.utils.BN
const expect = chai.expect;

contract("Test", async() => {

    it("new tokens are being minted", async()=>{
        let mintToken = await instance.mintToken()
        return expect(instance.balanceOf())












    }) 



}

















)