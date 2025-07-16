import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import { isValidUrl, isValidShortcode, isUniqueCode } from '../utils/validation';
import { generateUniqueCode } from '../utils/shortCodeGenerator';
import { saveToStorage } from '../utils/storage';
import { logEvent } from '../utils/logger';

const ShortenerPage = () => {
  const [entries, setEntries] = useState(
    Array.from({ length: 5 }, () => ({ url: '', validity: '', code: '' }))
  );
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleShorten = () => {
    const newResults = [];

    entries.forEach(({ url, validity, code }, index) => {
      if (!url) return;

      if (!isValidUrl(url)) {
        alert(`Invalid URL at position ${index + 1}`);
        return;
      }

      if (code && (!isValidShortcode(code) || !isUniqueCode(code))) {
        alert(`Invalid or duplicate shortcode at position ${index + 1}`);
        return;
      }

      const finalCode = code || generateUniqueCode();
      const validTime = parseInt(validity) || 30;

      const data = {
        code: finalCode,
        originalUrl: url,
        createdAt: Date.now(),
        expiresAt: Date.now() + validTime * 60000,
        clicks: [],
        clickCount: 0,
      };

      saveToStorage(finalCode, data);
      logEvent("URL_SHORTENED", data);
      newResults.push(data);
    });

    setResults(newResults);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Shortener</Typography>

      {entries.map((entry, idx) => (
        <Grid container spacing={2} key={idx} style={{ marginTop: 10 }}>
          <Grid item xs={4}>
            <TextField
              label="Original URL"
              fullWidth
              value={entry.url}
              onChange={(e) => handleChange(idx, 'url', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Validity (min)"
              fullWidth
              value={entry.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={entry.code}
              onChange={(e) => handleChange(idx, 'code', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" onClick={handleShorten} style={{ marginTop: 20 }}>
        Shorten URLs
      </Button>

      <div style={{ marginTop: 20 }}>
        {results.map((r) => (
          <Card key={r.code} style={{ marginTop: 10 }}>
            <CardContent>
              <Typography>Original: {r.originalUrl}</Typography>
              <Typography>Short URL: http://localhost:3000/{r.code}</Typography>
              <Typography>Expires at: {new Date(r.expiresAt).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShortenerPage;