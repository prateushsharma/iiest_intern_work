// MyReviews.js
import React, { useState, useEffect } from 'react';
import ReviewedCard from './MyReviewCard';
import { connectWallet } from './ConnectWallet';
import ABI from './ABI';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './ContractAddress';

const getReviewedVideos = async () => {
  const signer = await connectWallet();
  if (signer) {
    const contractAddress = CONTRACT_ADDRESS;
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      const address = await signer.getAddress();
      const reviewedVideos = await contract.getVideosToReview(address);
      console.log('Reviewed videos:', reviewedVideos);
      return reviewedVideos;
    } catch (error) {
      console.error('Error fetching reviewed videos:', error);
      return [];
    }
  }
};

const MyReviews = () => {
  const [reviewedVideos, setReviewedVideos] = useState([]);

  useEffect(() => {
    const fetchReviewedVideos = async () => {
      const videos = await getReviewedVideos();
      setReviewedVideos(videos);
    };

    fetchReviewedVideos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {reviewedVideos.map((video, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={index}>
            <ReviewedCard
              videoUrl={video.videoHash}
              account={video.uploader}
              name={video.name}
              customValue={video.description}
              Time={video.timestamp}
              Genre={video.genre}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
