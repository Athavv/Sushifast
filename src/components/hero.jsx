import React, { useState } from "react";
import backgroundVideo from "../assets/shushi-background.mp4";
import "../styles/hero.css";

function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <header className="sushi-hero vh-100 position-relative">
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          className="position-absolute top-0 start-0 w-100 h-100"
          onError={() => setVideoError(true)}
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      <div
        className="sushi-hero-overlay position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 1 }}
      />

      <div
        className="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
        style={{ zIndex: 2 }}
      >
        <h1 className="display-2 fw-bold sushi-hero-title">
          Sushi Fast — Fraîcheur &amp; Rapidité
        </h1>
        <p className="lead mt-4 sushi-hero-lead">
          Découvrez nos box signatures, pensées pour les amoureux de sushi pressés.
        </p>
      </div>

      <div
        className="sushi-hero-scroll position-absolute start-50 translate-middle"
        style={{ top: "78%", zIndex: 2 }}
      >
        <a href="#menu-list" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Hero;