import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoData = () => {
  const [clickData, setClickData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/video-clicks')
      .then(response => {
        setClickData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the video click data!', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <pre>{clickData}</pre>
    </div>
  );
};

export default VideoData;
