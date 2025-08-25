import { useState } from "react";

export default function FadeImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
