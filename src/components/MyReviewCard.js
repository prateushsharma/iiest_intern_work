import React from 'react';
import { BigNumber } from 'ethers';

export default function MyReviewCard({ videoUrl, account, name, customValue, Time, Genre }) {
  const formattedDate = React.useMemo(() => {
    try {
      const timestampUint256 = BigNumber.from(Time.toString());
      const timestampInMillis = timestampUint256.mul(1000).toNumber();
      return new Date(timestampInMillis).toLocaleString();
    } catch (error) {
      console.error('Invalid timestamp:', error);
      return 'Invalid Date';
    }
  }, [Time]);

  return (
    <div className="card mb-4">
      <video className="card-img-top" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="card-body">
        <h5 className="card-title">{name || 'Unknown Name'}</h5>
        <h5 className="card-title">{account || 'Unknown Account'}</h5>
        <p className="card-text">{customValue || 'No description available.'}</p>
        <h4 className="card-text">{Genre || 'No genre specified'}</h4>
        <p className="card-text">{formattedDate}</p>
      </div>
    </div>
  );
}
