var assert = require('assert');
const rewire = require('rewire');

hashing = rewire('hashing');


let Blockchain;


before(async () => {
    var poem = [
        "The power of a gun can kill",
        "and the power of fire can burn",
        "the power of wind can chill",
        "and the power of a mind can learn",
        "the power of anger can rage",
        "inside until it tears u apart",
        "but the power of a smile",
        "especially yours can heal a frozen heart",
    ];

    Blockchain = {
        blocks: [],
    };

    // Genesis block
    Blockchain.blocks.push({
        index: 0,
        hash: "000000",
        data: 5,
        timestamp: Date.now(),
    });

    // Genesis block
    /* Blockchain.blocks.push(GENESIS_BLOCK);
 
     // TODO: insert each line into blockchain
     for (let line of poem) {
         createBlock(line);
     }*/
});

describe('Test create block', async () => {
    it('has a invvalid block', async () => {
        var private_hashing = hashing.__get__('verifyBlock');
        assert(private_hashing(Blockchain.blocks[Blockchain.blocks.length]), false)

    });
});
