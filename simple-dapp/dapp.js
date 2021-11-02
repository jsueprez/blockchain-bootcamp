console.log("hello Dapp developers")

//. 1. detect Metamask is / is not installed
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