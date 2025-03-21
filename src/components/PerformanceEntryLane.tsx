import { Paper, alpha, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { stringToColor } from '../utils/stringToColor.ts';
import { useState } from 'react';

export const PerformanceEntryLane: React.FC<{ entry: PerformanceEntry; minStartTime: number; pixelPerMs: number }> = (
  props,
) => {
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Paper
        style={{
          marginLeft: (props.entry.startTime - props.minStartTime) * props.pixelPerMs,
          minWidth: Math.max(60, props.entry.duration * props.pixelPerMs),
          width: hovered ? 'fit-content' : Math.max(60, props.entry.duration * props.pixelPerMs),
          padding: 4,
          fontSize: '0.8em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textWrap: 'nowrap',
          backgroundColor: alpha(stringToColor(props.entry.entryType), 0.2),
          cursor: 'pointer',
        }}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={() => setDialogOpen(true)}
      >
        <span style={{ color: '#777' }}>{props.entry.entryType?.toUpperCase()}</span> {props.entry.name}
      </Paper>
      {dialogOpen && (
        <Dialog open={true} onClose={() => setDialogOpen(false)} fullWidth maxWidth="lg">
          <DialogTitle>
            {props.entry.entryType?.toUpperCase()} {entryToDescription(props.entry)}
          </DialogTitle>
          <DialogContent>
            <pre>{JSON.stringify(props.entry, null, 2)}</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const entryToDescription = (entry: PerformanceEntry) => {
  switch (entry.entryType) {
    case 'resource':
      return entry.name.split('/').pop() || entry.name;
    default:
      return entry.name;
  }
};
