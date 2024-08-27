// Video.jsx
import VideoPlayer from "./VideoPlayer"; // Ensure this path is correct
import { useRef } from "react";
import '../App.css';

const Video = () => {
  const playerRefs = useRef([]);
  const videoLinks = [
    "http://localhost:8000/uploads/courses/895674af-4359-4526-a343-9f661fac39f0/index.m3u8",
    "http://localhost:8000/uploads/courses/6ccaf94b-de7e-49a0-a911-e1ef02eeddf8/index.m3u8",
    "http://localhost:8000/uploads/courses/b33e10cc-e70a-404d-84c3-f9bd141b5bb0/index.m3u8"
  ];

  const videoCaptions = [
      "Nature walk",
      "Mahabaleshwar",
    "Uttrayan 2024"
  ];

  const handlePlayerReady = (player, index) => {
    playerRefs.current[index] = player;
    player.on("waiting", () => {
      console.log(`Player ${index} is waiting`);
    });
    player.on("dispose", () => {
      console.log(`Player ${index} will dispose`);
    });
  };

  return (
    <div className="min-h-screen ">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Stream Forge</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoLinks.map((link, index) => (
          <div key={index} className="relative w-full h-64 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <VideoPlayer
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{ src: link, type: "application/x-mpegURL" }],
              }}
              onReady={(player) => handlePlayerReady(player, index)}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-70 bg-gray-800 text-white text-center p-2">
              {videoCaptions[index] || "Video Caption"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
