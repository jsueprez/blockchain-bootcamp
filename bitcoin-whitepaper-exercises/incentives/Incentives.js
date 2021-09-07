"use strict";

var path = require("path");
var fs = require("fs");
var crypto = require("crypto");

const KEYS_DIR = path.join(__dirname, "keys");
const PUB_KEY_TEXT = fs.readFileSync(path.join(KEYS_DIR, "pub.pgp.key"), "utf8");

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

const maxBlockSize = 4;
const blockFee = 5;
var difficulty = 16;

var Blockchain = {
    blocks: [],
};

// Genesis block
Blockchain.blocks.push({
    index: 0,
    hash: "000000",
    data: "",
    timestamp: Date.now(),
});

var transactionPool = [];

addPoem();
processPool();
countMyEarnings();


// **********************************

function addPoem() {

    let data = [];

    for (let line of poem) {
        transactionPool.push(createTransaction(line));
    }
}

function createTransaction(data) {
    var tr = {
        data,
        fee: Math.floor(Math.random() * 10) + 1,
    };

    tr.hash = transactionHash(tr);

    return tr;
}

function transactionHash(tr) {
    return crypto.createHash("sha256").update(
        `${JSON.stringify(tr.data)}`
    ).digest("hex");
}

function processPool() {
    let sortedPool = [...transactionPool].sort((a, b) => b.fee - a.fee);

    let currentTrCount = 0;
    let blockList = [];

    for (let transaction of sortedPool) {
        // Remove from fromAccount.outputs since we are discounting the amount
        transactionPool.splice(transactionPool.indexOf(transaction), 1);
        blockList.push(transaction);

        currentTrCount++;
        if (currentTrCount >= maxBlockSize) {
            var bl = createBlock([...blockList]);
            Blockchain.blocks.push(bl);

            currentTrCount = 0;
            blockList.length = 0
        }

    }
}

function countMyEarnings() {

    let fixEarnings = 0;
    let variableEarnings = 0;

    for (let bl of Blockchain.blocks) {

        if (bl.index === 0) continue;

        fixEarnings += bl.blockFee;

        for (let tr of bl.data) {
            variableEarnings += tr.fee;
        }
    }
    console.log(`Fixed earnings : ${fixEarnings}`);
    console.log(`Variable earnings : ${variableEarnings}`);
    console.log(`Total earnings : ${fixEarnings + variableEarnings}`);
}

function createBlock(data) {
    var bl = {
        blockFee: blockFee,
        account: PUB_KEY_TEXT,
        index: Blockchain.blocks.length,
        prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
        data,
        timestamp: Date.now(),
    };

    bl.hash = blockHash(bl);

    return bl;
}

function blockHash(bl) {
    while (true) {
        bl.nonce = Math.trunc(Math.random() * 1E7);
        let hash = crypto.createHash("sha256").update(
            `${bl.index};${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp};${bl.nonce}`
        ).digest("hex");

        if (hashIsLowEnough(hash)) {
            return hash;
        }
    }
}

function hashIsLowEnough(hash) {
    var neededChars = Math.ceil(difficulty / 4);
    var threshold = Number(`0b${"".padStart(neededChars * 4, "1111".padStart(4 + difficulty, "0"))}`);
    var prefix = Number(`0x${hash.substr(0, neededChars)}`);
    return prefix <= threshold;
}