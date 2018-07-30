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
