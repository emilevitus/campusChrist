import React from "react";
import { useParams } from "react-router-dom";

export default function VideoDetail() {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎥 Lecture vidéo</h1>
      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-lg shadow"
          src={`https://www.youtube.com/embed/${id}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-center text-gray-600">
        Vous regardez la rediffusion complète sur notre plateforme.
      </p>
    </div>
  );
}
