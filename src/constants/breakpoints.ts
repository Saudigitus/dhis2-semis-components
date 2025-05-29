export const breakpoints = {
    down: (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
        const values = {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        };
        return `@media (max-width:${values[key]}px)`;
    },
};
