import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer({ progress }: { progress: { progress: number, buffer: number } }) {

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={progress.progress} valueBuffer={progress.buffer} />
        </Box>
    );
}