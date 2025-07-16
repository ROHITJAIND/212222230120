import React from 'react';
import { loadAllUrls } from '../utils/storage';
import { Typography, Card, CardContent } from '@mui/material';

const StatisticsPage = () => {
  const data = loadAllUrls();
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Statistics</Typography>
      {data.map(item => (
        <Card key={item.code} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography>Short: http://localhost:3000/{item.code}</Typography>
            <Typography>Original: {item.originalUrl}</Typography>
            <Typography>Created At: {new Date(item.createdAt).toLocaleString()}</Typography>
            <Typography>Expires At: {new Date(item.expiresAt).toLocaleString()}</Typography>
            <Typography>Total Clicks: {item.clicks.length}</Typography>
            {item.clicks.map((click, i) => (
              <Typography key={i}>Click {i + 1}: {new Date(click.timestamp).toLocaleString()} | {click.source} | {click.location}</Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsPage;
