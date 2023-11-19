// theme/index.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // Customize the primary color
        },
        secondary: {
            main: '#ff5722', // Customize the secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Customize the default font family
    },
});

export default theme;
