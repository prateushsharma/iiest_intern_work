import { ethers } from 'ethers';

export const connectWallet = async () => {
    if (!window.ethereum) {
        console.error('No Ethereum provider found. Make sure MetaMask is installed.');
        return;
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected");
    } catch (error) {
        console.error('Error requesting accounts:', error);
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
};