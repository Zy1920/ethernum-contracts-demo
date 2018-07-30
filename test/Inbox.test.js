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
        await result.methods.setMessage("马贱贱是个大傻逼!~~~").send({
            from:accounts[0],
            gas:3000000
        })
        const cici=await result.methods.getMessage().call()
        console.log(cici)
        assert.equal(cici,"马贱贱是个大傻逼!~~~");

    });
});