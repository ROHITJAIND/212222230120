import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getAllStorage } from '../utils/storage';

const StatisticsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = getAllStorage();
    setUrls(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Statistics</Typography>
      {urls.map(item => (
        <Card key={item.code} style={{ marginTop: 15 }}>
          <CardContent>
            <Typography variant="h6">Short URL: http://localhost:3000/{item.code}</Typography>
            <Typography>Original: {item.originalUrl}</Typography>
            <Typography>Created: {new Date(item.createdAt).toLocaleString()}</Typography>
            <Typography>Expires: {new Date(item.expiresAt).toLocaleString()}</Typography>
            <Typography>Total Clicks: {item.clickCount}</Typography>
            <Typography variant="subtitle1" style={{ marginTop: 10 }}>Click Details:</Typography>
            {item.clicks.length === 0 ? (
              <Typography>No clicks yet</Typography>
            ) : (
              item.clicks.map((click, i) => (
                <div key={i} style={{ marginLeft: 10, marginBottom: 5 }}>
                  <Typography>- Time: {new Date(click.timestamp).toLocaleString()}</Typography>
                  <Typography>- Source: {click.source}</Typography>
                  <Typography>- Location: {click.geo}</Typography>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsPage;
