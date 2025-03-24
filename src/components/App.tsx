import { Typography, AppBar, Toolbar, Grid2, TextField, Button, Slider } from '@mui/material';
import { useState, useMemo } from 'react';
import { PerformanceSwimlane } from './PerformanceSwimlane.tsx';
import { parseJsonsFromText } from '../utils/parseJsonsFromText.ts';

export const App = () => {
  const [textFieldHeight, setTextFieldHeight] = useState(1);
  const [pixelPerMs, setPixelPerMs] = useState(10);
  const [entriesText, setEntriesText] = useState('');
  const [error, setError] = useState(false);
  const entriesParsed: PerformanceEntry[] = useMemo(() => {
    try {
      setError(false);
      const chunks = parseJsonsFromText(entriesText);
      const jsonObjects = chunks.filter((chunk) => chunk.startsWith('{') && chunk.endsWith('}'));
      return jsonObjects
        .map((json) => {
          try {
            return JSON.parse(json);
          } catch (e) {
            console.error(`Error parsing single JSON object, skipping it. json=${json}`, e);
            setError(true);
            return null;
          }
        })
        .filter((entry) => entry !== null)
        .sort((a, b) => a.startTime - b.startTime);
    } catch (e) {
      console.error('Failed to process text input', e);
      setError(true);

      return [];
    }
  }, [entriesText]);

  const minStartTime = useMemo(
    () => entriesParsed.reduce((min, entry) => Math.min(min, entry.startTime), Infinity),
    [entriesParsed],
  );

  const loadExample = () => {
    setEntriesText(
      `Example:\n${performance
        .getEntries()
        .map((entry) => `Entry: ${JSON.stringify(entry)}`)
        .join('\n')}`,
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid2
            container
            direction="column"
            justifyItems="stretch"
            spacing={2}
            style={{ margin: '8px', width: '100%' }}
          >
            <Grid2 container flexWrap="nowrap" alignItems="center">
              <Typography variant="h6">
                <b>Performance Browser for</b> <code>PerformanceEntry</code>
              </Typography>
              <Button variant="contained" color="secondary" onClick={loadExample}>
                Load Example
              </Button>
              <Grid2 flexGrow={1} />
              <Grid2 flexGrow={1} style={{ paddingTop: '10px', maxWidth: '300px' }}>
                Zoom (Pixel per ms):
                <Slider
                  color="secondary"
                  valueLabelDisplay="auto"
                  value={pixelPerMs}
                  onChange={(_, value) => setPixelPerMs(value as number)}
                  min={0.1}
                  max={20}
                  step={0.1}
                />
              </Grid2>
            </Grid2>
            <TextField
              label="Performance events as JSON within text"
              helperText={
                error
                  ? 'An error happened while parsing, review browser console for details.'
                  : 'The text should somehow contain the PerformanceEntry records as JSON objects, it is fine if other text is around the JSON objects.'
              }
              error={error}
              color="secondary"
              multiline
              fullWidth
              rows={textFieldHeight}
              onBlur={() => setTextFieldHeight(1)}
              onFocus={() => setTextFieldHeight(10)}
              value={entriesText}
              onChange={(e) => setEntriesText(e.target.value)}
            />
          </Grid2>
        </Toolbar>
      </AppBar>
      <div style={{ position: 'absolute', left: 0, top: 200, right: 0, bottom: 0, overflow: 'auto' }}>
        <Grid2 container direction="column" style={{ margin: 16, width: '100%' }}>
          <PerformanceSwimlane entries={entriesParsed} minStartTime={minStartTime} pixelPerMs={pixelPerMs} />
        </Grid2>
      </div>
    </>
  );
};
