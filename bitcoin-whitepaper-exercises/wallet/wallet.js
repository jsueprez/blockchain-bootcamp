"use strict";

var path = require("path");
var fs = require("fs");

// Object of Blockcahin type
var Blockchain = require(path.join(__dirname, "blockchain.js"));

const KEYS_DIR = path.join(__dirname, "keys");
const PRIV_KEY_TEXT_1 = fs.readFileSync(path.join(KEYS_DIR, "1.priv.pgp.key"), "utf8");
const PUB_KEY_TEXT_1 = fs.readFileSync(path.join(KEYS_DIR, "1.pub.pgp.key"), "utf8");
const PRIV_KEY_TEXT_2 = fs.readFileSync(path.join(KEYS_DIR, "2.priv.pgp.key"), "utf8");
const PUB_KEY_TEXT_2 = fs.readFileSync(path.join(KEYS_DIR, "2.pub.pgp.key"), "utf8");

var wallet = {
    accounts: {},
};

addAccount(PRIV_KEY_TEXT_1, PUB_KEY_TEXT_1);
addAccount(PRIV_KEY_TEXT_2, PUB_KEY_TEXT_2);

// fake an initial balance in account #1
wallet.accounts[PUB_KEY_TEXT_1].outputs.push(
    {
        account: PUB_KEY_TEXT_1,
        amount: 42
    }
);

main().catch(console.log);


// **********************************

async function main() {
    await spend(
		/*from=*/wallet.accounts[PUB_KEY_TEXT_1],
		/*to=*/wallet.accounts[PUB_KEY_TEXT_2],
		/*amount=*/13
    );

    await spend(
		/*from=*/wallet.accounts[PUB_KEY_TEXT_2],
		/*to=*/wallet.accounts[PUB_KEY_TEXT_1],
		/*amount=*/5
    );

    await spend(
		/*from=*/wallet.accounts[PUB_KEY_TEXT_1],
		/*to=*/wallet.accounts[PUB_KEY_TEXT_2],
		/*amount=*/31
    );

    try {
        await spend(
			/*from=*/wallet.accounts[PUB_KEY_TEXT_2],
			/*to=*/wallet.accounts[PUB_KEY_TEXT_1],
			/*amount=*/40
        );
    }
    catch (err) {
        console.log(err);
    }

    console.log(await Blockchain.verifyChain(Blockchain.chain));
}

function addAccount(privKey, pubKey) {
    wallet.accounts[pubKey] = {
        privKey,
        pubKey,
        outputs: []
    };
}

async function spend(fromAccount, toAccount, amountToSpend) {

    let initialBalance = accountBalance(fromAccount.pubKey);

    console.log(`Initial Balance :  ${initialBalance}`)

    var trData = {
        inputs: [],
        outputs: [],
    };

    var sortedArray = [...fromAccount.outputs].sort((a, b) => b.amount - a.amount);

    var inputsToUse = [];
    var inputAmount = 0;

    for (let input of sortedArray) {
        // Remove from fromAccount.outputs since we are discounting the amount
        fromAccount.outputs.splice(fromAccount.outputs.indexOf(input), 1);

        // Add this input as valid fro do the Spend
        inputsToUse.push(input);
        // Sum the amount collected to do the Spend
        inputAmount += input.amount;

        // If during the loop We reach the amountToSpend, just break and continue.
        if (inputAmount >= amountToSpend) break;
    }

    // Do we have enough amount in the fromAcount to perfmr the Spend, otherwise throw an exception
    if (inputAmount < amountToSpend) {
        fromAccount.outputs.push(...inputsToUse);
        throw `Don't have enough to spend ${amountToSpend}!`;
    }

    // Add the inputs to use inthe inputs transactions
    for (let input of inputsToUse) {
        trData.inputs.push(
            await Blockchain.authorizeInput(
                {
                    account: input.account,
                    amount: input.amount
                },
                fromAccount.privKey)
        );
    }

    // Add the transaction to be performed to the transaction output. 
    trData.outputs.push({ account: toAccount.pubKey, amount: amountToSpend });

    // Do we need to give back some change? If positivie, add this transaction ot the transation output.
    if (inputAmount >= amountToSpend) {
        trData.outputs.push({ account: fromAccount.pubKey, amount: inputAmount - amountToSpend });
    }

    // create a transaction
    var tr = Blockchain.createTransaction(trData);

    // Create block with the transaction.. Must "cast" to array
    var blk = Blockchain.createBlock([tr]);

    // insert block into the blockchain
    Blockchain.insertBlock(blk);

    // save the transactions according to the account address.
    for (let output of trData.outputs) {
        if (output.account in wallet.accounts) {
            wallet.accounts[output.account].outputs.push(output);
        }
    }

    console.log(`Amount to transfer : ${amountToSpend}`);
    console.log(`Balance of fromAccount is: ${accountBalance(PUB_KEY_TEXT_1)}`);
    console.log(`Balance of toAccount is: ${accountBalance(PUB_KEY_TEXT_2)}\n`);

}

function accountBalance(account) {
    var balance = 0;

    if (account in wallet.accounts) {
        for (let output of wallet.accounts[account].outputs) {
            balance += output.amount
        }
    }
    return balance;
}