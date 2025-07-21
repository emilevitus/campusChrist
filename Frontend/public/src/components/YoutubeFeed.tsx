import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoModal from "./ui/VideoModal";

const API_KEY = "AIzaSyAOcHtGGYpNYjXPH40tlzWAXFHVKxVk1ZM";
const CHANNEL_ID = "UCg1vCg1xKY1fQfLInFd91vg";

type Video = {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

export default function YoutubeFeed() {
  const [liveVideo, setLiveVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fetchLiveVideo = async () => {
    try {
      const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          eventType: "live",
          type: "video",
          part: "snippet",
          maxResults: 1,
        },
      });

      if (res.data.items.length > 0) {
        const item = res.data.items[0];
        setLiveVideo({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du live :", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          order: "date",
          type: "video",
          part: "snippet",
          maxResults: 6,
        },
      });

      const videoList = res.data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      }));

      setVideos(videoList);
    } catch (error) {
      console.error("Erreur vidéos :", error);
    }
  };

  useEffect(() => {
    fetchLiveVideo();
    fetchVideos();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {liveVideo && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">🔴 En direct maintenant</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
            title={liveVideo.title}
            allowFullScreen
            className="rounded-lg shadow"
          />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">📼 Dernières vidéos</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video, index) => (
          <div
            key={video.videoId}
            onClick={() => setSelectedIndex(index)}
            className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition"
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500">{new Date(video.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <VideoModal
          videoId={videos[selectedIndex].videoId}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : prev))}
          onNext={() => setSelectedIndex((prev) => (prev! < videos.length - 1 ? prev! + 1 : prev))}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < videos.length - 1}
        />
      )}
    </div>
  );
}
