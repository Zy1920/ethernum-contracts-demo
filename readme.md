# 智能合约的开发流程

### 文件目录

- contracts目录：编写智能合约
  - Inbox.sol
- test：测试
  - Inbox.test.js
- package.json
- compile.js：编译智能合约
- deploy.js：部署智能合约



### 项目所需npm包的安装

```solidity
npm install --save solc
npm install --save mocha//测试框架
npm install --save ganache-cli//测试环境
npm install --save web3//sdk，可以与区块链系统进行交互
```



###solidity编写智能合约

```solidity
pragma solidity ^0.4.17;

contract Inbox{
    string public message;
    function Inbox(string _message) public{
    message = _message;
}
    function setMessage(string _message) public{
        message = _message;
    }
    function getMessage() public view returns(string){
        return message;
    }
```

### solidity编译智能合约

```solidity
const path = require('path');
const fs = require('fs');
const solc = require('solc')

//获取智能合约文件路径
const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
//fs读取文件
const source = fs.readFileSync(inboxPath,'utf-8');
console.log(source);
//solc对智能合约将进行编译
solc.compile(source,1)
console.log(solc.compile(source,1))

module.exports = solc.compile(source,1).contracts[':Inbox']

```

### 以太坊的智能合约测试（虚拟）

bytecode--->部署到ganache-cli

ABI--->使用web3.js进行调用

```
const  assert = require('assert');
const ganache = require('ganache-cli');
//约定的规范 如果变量以大写做字母开头, 他就是一个构造方法(构造函数)
const Web3 = require('web3');
const {interface,bytecode} =require("../compile")

//把ganache测试网络的卡插入到web3里面
const web3=new Web3(ganache.provider());

describe('测试智能合约', function () {
    it('测试合约的版本', function () {
        //console.log(web3.version)
    });
    it('测试web3的常用api ', function () {
        /*console.log(web3.providers);
        console.log(web3.utils);
        console.log(web3.eth);
        console.log(web3.utils.bytesToHex("xixi"));*/
    });

    it('测试web3的api',async ()=>{
        /*const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const money = await web3.eth.getBalance(accounts[0]);
        console.log(web3.utils.fromWei(money,'ether'));*/
    });

    it('测试部署操作', async function () {
        const accounts = await web3.eth.getAccounts();
        const result=await new web3.eth.Contract(JSON.parse(interface))
            .deploy({
                data:bytecode,
                arguments:["郭大大是个小可爱！~~~"]
            })
            .send({
                from:accounts[0],
                gas:3000000
            })
        const res=await result.methods.getMessage().call()
        console.log(res)
        assert.equal(res,"郭大大是个小可爱！~~~");
        await result.methods.setMessage("嘻嘻!~~~").send({
            from:accounts[0],
            gas:3000000
        })
        const cici=await result.methods.getMessage().call()
        console.log(cici)
        assert.equal(cici,"嘻嘻!~~~");

    });
});
```

### 智能合约的部署

```
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
```

### 回顾部署智能合约的流程

- 设置web3 模块部署的智能合约有什么接口可以供交互 contract(interface)
- 设置web3 模块要部署的智能合约真正的字节码  deploy(bytecode)
- send方法 指引web3去发送transaction,部署智能合约 send(trans)

web3 不仅可以部署智能合约  abi ,bytecode
也可以调用部署好的智能合约 abi, address

注意异步的代码









