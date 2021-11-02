console.log("hello Dapp developers")

//. 1. detect Metamask is / is not installed
const ssAddress = '0x4339344874A6f90d40C63735602535770bf7C7Db'
const ssABI = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

window.addEventListener('load', function () {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Metamask detected!')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask Has Been Detected!"
    }
    else {
        console.log('There is no Wallet! Not Available!')
        this.alert("You need to install Metamask or another wallet!")
    }
})

//2. Allow the user to get access to Metamask
const mmEnable = document.getElementById('mm-connect')
mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts' })

    const mmCurrentAccount = document.getElementById('mm-current-account')

    mmCurrentAccount.innerHTML = "Here is your current account: " + ethereum.selectedAddress
}

// 3. Allow the user to send a transaction / update contract state ( i.e send a transaction to a contract)

const ssSubmit = document.getElementById('ss-input-button')

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value
    var web3 = new Web3(window.ethereum)

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

    simpleStorage.setProvider(window.ethereum)

    await simpleStorage.methods.store(ssValue).send({ from: ethereum.selectedAddress })
}

const ssRetrieve = document.getElementById('ss-get-value')

ssRetrieve.onclick = async () => {

    var web3 = new Web3(window.ethereum)

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

    simpleStorage.setProvider(window.ethereum)

    var value = await simpleStorage.methods.retrieve().call()
    const ssValue = document.getElementById('ss-display-value')
    ssValue.innerHTML = 'Current Simple Storage value :' + value
}







