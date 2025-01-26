import React, { useRef } from 'react';
import { BigNumber } from 'ethers';
import { connectWallet } from './ConnectWallet';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './ContractAddress';
import ABI from './ABI';

const markVideoForReview = async (videoHash, reason) => {
  const signer = await connectWallet();
  if (signer) {
    const contractAddress = CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      await contract.markVideoForReview(videoHash, reason);
      console.log('Video marked for review successfully.');
      alert('Thank you for marking the video for review.');
    } catch (error) {
      console.error('Error marking video for review:', error);
    }
  }
};

export default function ReviewCard({ videoUrl, account, name, customValue, Time, Genre }) {
  const timestampUint256 = BigNumber.from(Time.toString());
  const timestampInMillis = timestampUint256.mul(1000).toNumber();
  const date = new Date(timestampInMillis);
  const formattedDate = date.toLocaleString();
  const videoRef = useRef(null);

  const handlePlay = async (videoUrl, length, genre) => {
    const signer = await connectWallet();
    const address = await signer.getAddress();

    console.log(`Video played by ${address}.`);
    // You can add additional logic here if needed
  };

  const handleReview = () => {
    const reason = prompt('Please enter a reason for marking this video for review:');
    if (reason) {
      markVideoForReview(videoUrl, reason);
    }
  };

  return (
    <div className="card mb-4">
      <video
        className="card-img-top"
        controls
        ref={videoRef}
        onPlay={() => handlePlay(videoUrl, videoRef.current.duration, Genre)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h5 className="card-title">{account}</h5>
        <p className="card-text">{customValue}</p>
        <h4 className="card-text">{Genre}</h4>
        <p className="card-text">{formattedDate}</p>
        <button onClick={handleReview} className="btn btn-warning">
          Review
        </button>
      </div>
    </div>
  );
}
