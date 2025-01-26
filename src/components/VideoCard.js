import React, { useState, useRef } from 'react';
import { BigNumber } from 'ethers';
import axios from 'axios';
import { connectWallet } from './ConnectWallet';
import { privateKey, saveData } from './SideChain';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './ContractAddress';
import ABI from './ABI';

const reportVideo = async (videoHash, reason) => {
  const signer = await connectWallet();
  if (signer) {
    const contractAddress = CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      await contract.reportVideo(videoHash, reason);
      console.log('Successfully reported the video');
      alert('Thank you for reporting the video');
    } catch (error) {
      console.log('Error reporting video:', error);
    }
  }
};

export default function VideoCard({ videoUrl, account, name, customValue, Time, Genre }) {
  const timestampUint256 = BigNumber.from(Time.toString());
  const timestampInMillis = timestampUint256.mul(1000).toNumber();
  const date = new Date(timestampInMillis);
  const formattedDate = date.toLocaleString();
  const videoRef = useRef(null);

  const handlePlay = async (videoUrl, length, genre) => {
    const owner = account;
    const signer = await connectWallet();
    const address = await signer.getAddress();

    await saveData(address, videoUrl, account, Genre, privateKey).then(() => {
      console.log('Data saved');
    });

    const response = await fetch('http://localhost:3000/click-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, videoUrl, owner, length, genre }),
    });

    if (response.ok) {
      console.log('Video data stored successfully');
    } else {
      console.error('Error storing video data');
    }
  };

  const handleReport = () => {
    const reason = prompt('Please enter a reason for reporting this video:');
    if (reason) {
      reportVideo(videoUrl, reason);
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
        <button onClick={handleReport} className="btn btn-primary">
          Report
        </button>
      </div>
    </div>
  );
}
