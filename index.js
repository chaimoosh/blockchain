const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash;
  }

  calculateHash(){
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2018", "Genesis Block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1]

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false
      }

      return true
    }
  }
}


let coin = new Blockchain();
coin.addBlock(new Block(1, "01/06/2018", { amount: 4 }))
coin.addBlock(new Block(2, "04/23/2018", { amount: 43 }))
coin.addBlock(new Block(3, "05/13/2018", { amount: 5 }))
coin.addBlock(new Block(4, "05/09/2018", { amount: 67 }))
coin.addBlock(new Block(5, "07/13/2018", { amount: 56 }))

console.log('Is blockchain valid?' + coin.isChainValid())
//console.log(JSON.stringify(coin, null, 4))
coin.chain[2].data = { amount: 546 }
//coin.chain[2].hash = coin.chain[2].calculateHash()
console.log('Is blockchain valid?' + coin.isChainValid())
