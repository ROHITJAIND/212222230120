import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFromStorage, updateClicks } from '../utils/storage';
import { logEvent } from '../utils/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const data = getFromStorage(shortcode);
    if (!data || Date.now() > data.expiresAt) {
      setError('Link expired or invalid');
      return;
    }
    const click = {
      timestamp: Date.now(),
      source: document.referrer || 'Direct',
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
    };
    updateClicks(shortcode, click);
    logEvent("REDIRECT_CLICK", click);
    window.location.href = data.originalUrl;
  }, [shortcode]);

  return <div style={{ padding: 20 }}>{error ? error : 'Redirecting...'}</div>;
};

export default RedirectHandler;
