// src/Components/VideoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = ({ onVideoSelect }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-item cursor-pointer text-center"
          onClick={() => onVideoSelect(video)}
        >
          <img src={video.thumbnail} alt={video.title} className="w-full rounded-lg" />
          <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
