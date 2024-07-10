// HomePage.js
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { connectWallet } from './ConnectWallet';
import ABI from './ABI'
import axios from "axios";
import { ethers } from "ethers";
import {CONTRACT_ADDRESS} from "./ContractAddress"
const metaData = (hash) => {
  axios({
    method: 'get',
    url: `https://gateway.pinata.cloud/ipfs/${hash}`,
    headers: {
      pinata_api_key: `ecd57b8a07c136bc3ef0`,
            pinata_secret_api_key: `a42cadac785225b91b451fb4de55df435f11c082dc92868f914fdec492fc39d7`,
    },
  })
    .then((response) => {
      const metadata = response.data;
      console.log(metadata);
      // Process metadata as needed
    })
    .catch((error) => {
      console.error('Error fetching metadata:', error);
    });
}









const getVideos = async (account) => {
  const signer = await connectWallet();
  if (signer) {            //0x002f1272BA5E1951bF988D918786109c085813d8
    const contractAddress = '0xf82784b8a89Da52fcD020e5a409010c90704F066'; // Replace with your contract address
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      const videos = await contract.getAllVideos();
      console.log('Video  details:', videos);
      console.log(videos);
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }
}

const HomePage = () => {
  const [account, setAccount] = useState(null);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getAccount = async () => {
      const signer = await connectWallet();
      const account = await signer.getAddress();
      if (account) {
        setAccount(account);
        getVideos(account).then((videos) => {
          setVideoData(videos);
        });
      }
    };
    getAccount();
  }, []);


  // useEffect(() => {
  //   const fetchMetadata = async () => {
  //     const metadataArray = await Promise.all(videoData.map(async (video) => {
  //       return await metaData(video[0]);
  //     }));
  //     setVideoData(videoData.map((video, index) => ({
  //       ...video,
  //       metadata: metadataArray[index]
  //     })));
  //   };

  //   fetchMetadata();
  // }, [videoData]);



  return (
    <div className="container mt-4">
      <div className="row">
        {videoData.map((video, index) => (
          
          
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={index}>
           
            <VideoCard
             videoUrl={video[0]}
             account={video[1]}
            name={video[2]}
            customValue={video[3]}
            Time={video[4]}
            Genre={video[5]}
            
            
            
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
