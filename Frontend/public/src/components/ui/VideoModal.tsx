import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyAOcHtGGYpNYjXPH40tlzWAXFHVKxVk1ZM";

type Props = {
  videoId: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export default function VideoModal({
  videoId,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            key: API_KEY,
            part: "snippet",
            id: videoId,
          },
        });
        const snippet = res.data.items[0].snippet;
        setTitle(snippet.title);
        setDescription(snippet.description);
        setPublishedAt(new Date(snippet.publishedAt).toLocaleDateString());
      } catch (err) {
        console.error("Erreur description vidéo :", err);
      }
    };
    fetchDetails();
  }, [videoId]);

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(videoUrl)}`;

  // Fermer si on clique en dehors
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={handleClickOutside}
    >
      <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto">
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-0 text-white text-4xl px-4 hover:text-gray-300 z-50"
          >
            ❮
          </button>
        )}

        <div className="bg-white rounded-lg w-full relative shadow-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-800 text-2xl font-bold z-50 hover:text-black"
          >
            &times;
          </button>

          <div className="aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-1">{title}</h2>
            <p className="text-sm text-gray-500 mb-3">Publié le {publishedAt}</p>
            <p className="text-gray-700 text-sm whitespace-pre-line">{description}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigator.clipboard.writeText(videoUrl)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
              >
                Copier le lien
              </button>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
              >
                Partager sur WhatsApp
              </a>
            </div>
          </div>
        </div>

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-0 text-white text-4xl px-4 hover:text-gray-300 z-50"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
}
