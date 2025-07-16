import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { logEvent } from '../utils/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = getFromStorage(shortcode);
    if (!data) {
      alert("Invalid or expired URL.");
      window.location.href = "/";
      return;
    }

    const now = Date.now();
    if (now > data.expiresAt) {
      alert("This link has expired.");
      window.location.href = "/";
      return;
    }

    const clickData = {
      timestamp: new Date().toISOString(),
      source: document.referrer || "direct",
      geo: getSimulatedGeoLocation(), // Simulated for now
    };

    data.clicks.push(clickData);
    data.clickCount += 1;

    saveToStorage(shortcode, data);
    logEvent("URL_CLICKED", { shortcode, ...clickData });

    window.location.href = data.originalUrl;
  }, [shortcode]);

  const getSimulatedGeoLocation = () => {
    const locations = ["India", "USA", "Germany", "Brazil", "Japan"];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  return <div>Redirecting...</div>;
};

export default RedirectHandler;