import { useState, useEffect } from 'react';

function useViewportWidth() {
    const getVw = () => window.innerWidth;
    const [vw, setVw] = useState(getVw());

    useEffect(() => {
        const handleResize = () => {
            setVw(getVw());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return { viewPortWidth: vw };
}

export default useViewportWidth;
