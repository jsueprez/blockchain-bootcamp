"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
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

var block;

var Blockchain = {
    blocks: [],
};


// Genesis block
const GENESIS_BLOCK = {
    index: 0,
    hash: "000000",
    data: "",
    timestamp: Date.now(),
};

// Genesis block
Blockchain.blocks.push(GENESIS_BLOCK);

// TODO: insert each line into blockchain
for (let line of poem) {
    createBlock(line);
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

function createBlock(data) {
    let block = {
        // current block has to contain the preious block.hash
        prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
        // index is the last block + 1
        index: Blockchain.blocks.length,
        // data coming from the line
        data: data,
        // time of creation
        timestamp: Date.now(),
    }

    // create a hash for the current block
    block.hash = blockHash(block);

    if (verifyBlock(block)) {
        Blockchain.blocks.push(block);
        return block;
    }
    else {
        return false;
    }
}

function verifyBlock(block) {
    if (block.hash === blockHash(block)) {
        return true;
    } else {
        return false;
    }
}

function blockHash(bl) {
    return crypto.createHash("sha256").update(
        JSON.stringify(bl.prevHash)
            .concat(JSON.stringify(bl.index))
            .concat(JSON.stringify(bl.data))
            .concat(JSON.stringify(bl.timestamp)),
    ).digest("hex");
}

function verifyChain(Blockchain) {
    var result = false;

    if (Blockchain.blocks[0].hash !== "000000" || Blockchain.blocks[0].data === null) return result;

    for (let block of Blockchain.blocks) {
        if (block.index === 0) continue;

        if (block.data === null
            || block.prevHash === null
            || block.index <= 0
            || block.hash !== blockHash(block)) {
            return result;
        }
    }
    result = true;

    return result;
}
