//部署智能合约到真实的rankeby网络
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "gas north excuse ancient addict shaft marble awful panther edge bundle hill";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b5193966085f4ae0a469a7a77215b0ba");
const web3 = new Web3(provider);



deploy =async ()=>{
    const accounts=await web3.eth.getAccounts();
    //0x510776D2E0c193840cabAE08e099Db07F04d2E27
    console.log(accounts[0]);

    const result=await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode,
            arguments:["郭大大是个小可爱！~~~"]
        }).send({
            from:accounts[0],
            gas:3000000
        });
    console.log("address:"+result.options.address);
};
deploy();