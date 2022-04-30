let myToken = artifacts.require("myToken")

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts()
    await deployer.deploy(myToken)

    let instance = await myToken.deployed()
    
}