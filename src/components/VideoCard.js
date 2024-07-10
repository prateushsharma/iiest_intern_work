import React, { useState,useRef } from 'react';
import { BigNumber } from 'ethers';
import axios from 'axios'
import { connectWallet } from './ConnectWallet';
import {privateKey,saveData,getData,getAllData} from './SideChain';

export default function VideoCard({ videoUrl, account, name, customValue, Time, Genre }) {
  const timestampUint256 = BigNumber.from(Time.toString());
  const timestampInMillis = timestampUint256.mul(1000).toNumber();
  const date = new Date(timestampInMillis);
  const formattedDate = date.toLocaleString();
  const videoRef = useRef(null);

  const handlePlay = async ( videoUrl, length, genre) => {


    const owner = account;
    const signer = await connectWallet();
    const address = await signer.getAddress();
    //const addressString = String(address);

    await saveData(address,videoUrl,account,Genre,privateKey).then(() =>{
      console.log('Data saved');
    });
    const response = await fetch('http://localhost:3000/click-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, videoUrl,owner, length, genre })
    });
  
    if (response.ok) {
      console.log('Video data stored successfully');
    } else {
      console.error('Error storing video data');
    }
  };
  
    // Add your logic here to handle the play event
  

  return (
    <div className="card mb-4">
      <video className="card-img-top" controls ref={videoRef} onPlay={() => handlePlay(videoUrl, videoRef.current.duration, Genre)}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h5 className="card-title">{account}</h5>
        <p className="card-text">{customValue}</p>
        <h4 className="card-text">{Genre}</h4>
        <p className="card-text">{formattedDate}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
