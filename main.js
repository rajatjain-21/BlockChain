 const SHA256 = require('crypto-js/sha256');
 class Block {
     constructor(index, timestamp, data, previousHash = '') {
         this.index = index;
         this.timestamp = timestamp;
         this.data = data;
         this.previousHash = previousHash;
         this.hash = this.calculateHash();
         this.nonce = 0;
     }

     calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce +  JSON.stringify(this.data)).toString();
     }

     mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce += 1;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined..", this.hash);
     }
 }

 class BlockChain {
     constructor() {
         this.chain = [this.createGenesisBlock()];
         this.difficulty = 5;
     }

     createGenesisBlock() {
         return new Block(0,'01/01/2017', "Genesis Block", '0')
     }

     getLatestBlock() {
         return this.chain[this.chain.length - 1];
     }

     addBlock(newBlock) {
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.mineBlock(this.difficulty);
         this.chain.push(newBlock);
     }

     isValidChain() {
         for(let i = 1; i<this.chain.length; i++) {
             let currentBlock = this.chain[i];
             let previousBlock = this.chain[i - 1];
             if(currentBlock.hash != currentBlock.calculateHash())return false;
             if(currentBlock.previousHash != previousBlock.hash)return false;
         }
         return true;
     }
 }

 let rajatCoin = new BlockChain();
 console.log("Mining Block 1...");
 rajatCoin.addBlock(new Block(1, "10/07/2017", { amount: 40 }));
 console.log("Mining Block 2...");
 rajatCoin.addBlock(new Block(2, "11/07/2017", { amount: 50 }));
 