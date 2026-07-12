import React from 'react'

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function DeptDist() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className='p-3' >
            <h1 className='font-bold text-xl'>Department Distribution</h1>
            <Box className='flex flex-col gap-3 mt-3' sx={{ width: '100%' }}>
                <p>Science</p>
                <LinearProgress
                    variant="determinate"
                    value={20}
                    aria-label="Export data"
                />
                <p>Mathematics</p>
                <LinearProgress
                    variant="determinate"
                    value={70}
                    aria-label="Export data"
                />
                <p>English</p>
                <LinearProgress
                    variant="determinate"
                    value={50}
                    aria-label="Export data"
                />
            </Box>

        </div>
    )
}

export default DeptDist