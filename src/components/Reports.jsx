// MyReports.js
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { connectWallet } from './ConnectWallet';
import ABI from './ABI';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './ContractAddress';

const getReports = async () => {
  const signer = await connectWallet();
  if (signer) {
    const contractAddress = CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      const reports = await contract.getAllReportedVideos();
      console.log('Reported videos:', reports);
      return reports;
    } catch (error) {
      console.error('Error fetching reported videos:', error);
      return [];
    }
  }
};

const Reports = () => {
  const [reportedVideos, setReportedVideos] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await getReports();
      setReportedVideos(reports);
    };

    fetchReports();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {reportedVideos.map((video, index) => (
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
};

export default Reports;
