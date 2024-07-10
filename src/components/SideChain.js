const { ethers } = require('ethers');
export const privateKey = '0xcba2a75ddb85042bb8263f02d41c27eddd1a3708d924547886669e37a90f9cd0'; // Replace with your Ganache private key

// Replace with your contract's ABI
const contractABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "sender", "type": "address" },
            { "internalType": "string", "name": "url", "type": "string" },
            { "internalType": "string", "name": "address_owner", "type": "string" },
            { "internalType": "string", "name": "genre", "type": "string" }
        ],
        "name": "saveData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" }
        ],
        "name": "getAllData",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "url", "type": "string" },
                    { "internalType": "string", "name": "address_owner", "type": "string" },
                    { "internalType": "string", "name": "genre", "type": "string" }
                ],
                "internalType": "struct SideChain.Data[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "user", "type": "address" }
        ],
        "name": "getData",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "url", "type": "string" },
                    { "internalType": "string", "name": "address_owner", "type": "string" },
                    { "internalType": "string", "name": "genre", "type": "string" }
                ],
                "internalType": "struct SideChain.Data[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Replace with your contract's address
const contractAddress = '0xaBcf4130b33AA56394B69C176c62559d6858FFd0';

// Initialize ethers.js with Ganache provider
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
async function sendSignedTransaction(data, privateKey) {
    const wallet = new ethers.Wallet(privateKey, provider);
    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: 2000000, // Adjust gas limit as needed
    };
    const signedTx = await wallet.signTransaction(transaction);
    return provider.sendTransaction(signedTx);
}
export const saveData = async (sender, url, address_owner, genre, privateKey) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    const tx = await contract.saveData(sender, url, address_owner, genre);
    await tx.wait();
}
// Get data for the current user
export const getData = async (userAddress) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return await contract.getData(userAddress);
}

// Get data for a specific user
export const getAllData = async (userAddress) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return await contract.getAllData(userAddress);
}
