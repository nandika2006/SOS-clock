    const crypto = require('crypto');
    
    class Block {
        constructor(timestamp, data, previousHash = '') {
            this.timestamp = timestamp;
            this.data = data;
            this.previousHash = previousHash;
            this.hash = this.calculateHash();
        }
    
        calculateHash() {
            return crypto.createHash('sha256')
                .update(this.previousHash + this.timestamp + JSON.stringify(this.data))
                .digest('hex');
        }
    }
    
    class Blockchain {
        constructor() {
            this.chain = [this.createGenesisBlock()];
        }
    
        createGenesisBlock() {
            return new Block("01/01/2022", "Genesis Block", "0");
        }
    
        getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }
    
        addBlock(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
        }
    
        isChainValid() {
            for (let i = 1; i < this.chain.length; i++) {
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i - 1];
    
                // Check if the current block's hash is correct
                if (currentBlock.hash !== currentBlock.calculateHash()) {
                    return false;
                }
    
                // Check if the previous block's hash is correct
                if (currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }
            }
            return true;
        }
    }
    
    // Example usage
    let myCoin = new Blockchain();
    myCoin.addBlock(new Block("02/01/2022", { amount: 4 }));
    myCoin.addBlock(new Block("03/01/2022", { amount: 10 }));
    
    console.log(JSON.stringify(myCoin, null, 4));
    console.log("Is blockchain valid? " + myCoin.isChainValid());
    
    // Tampering with the blockchain
    myCoin.chain[1].data = { amount: 100 }; // Change the data of the second block
    myCoin.chain[1].hash = myCoin.chain[1].calculateHash(); // Recalculate the hash
    
    console.log("Is blockchain valid after tampering? " + myCoin.isChainValid());
