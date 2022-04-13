import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core'
import {red} from "@material-ui/core/colors";
import "fontsource-roboto/700.css"
import "fontsource-roboto/500.css"
import "fontsource-roboto/500.css"

export const theme = createMuiTheme({
                                        typography: {
                                            fontFamily: ["Roboto"].join(','),
                                            fontWeightBold: 700,
                                            fontWeightLighter: 500,
                                            fontWeightLight: 300,
                                            h1: {
                                                fontSize: '3rem',
                                                fontWeight: 'bold',
                                            },
                                            h2: {
                                                fontSize: '2.5rem'
                                            },
                                            h3: {
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                            },
                                            body2: {
                                                fontSize: '1rem',
                                                fontWeight: 'lighter',
                                            }
                                        },
                                        palette: {
                                            primary: {
                                                main: '#7e878e',
                                                light: '#87a0c1',
                                                dark: '#2b4763'
                                            },
                                            secondary: {
                                                main: '#8e857e',
                                                light: '#b8a595',
                                                dark: '#73685f'
                                            },
                                            error: {
                                                main: '#c87878',
                                                light: '#dc8282',
                                                dark: '#b46464',
                                            },
                                            warning: {
                                                main: '#fffead'
                                            },
                                            info: {
                                                main: '#857e8e',
                                                light: '#b3a3b5',
                                                dark: '#827987'
                                            },
                                            success: {
                                                main: '#9aaf88',
                                                light: '#b6bfa6',
                                                dark: '#878e7e'
                                            }
                                        },
                                    });

theme.props = {
    MuiButton: {
        color: 'primary',
        variant: 'contained'
    },
    MuiCard: {
        elevation: 0,
    },
};

theme.overrides = {
    MuiButton: {
        root: {
            textTransform: 'none',
        },
        containedPrimary: {
            backgroundColor: theme.palette.success.main,
            '&:hover': {
                backgroundColor: theme.palette.success.dark,
            }

        },
        containedSecondary: {
            backgroundColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
            }
        },
    },
    MuiCardHeader: {
        root: {
            padding: '6px 16px',
        },
    },
    MuiCardActions: {
        root: {
            padding: '0',
            margin: '0 16px',
            borderTop: `1px solid #b9af9f`
        },
    },
    MuiTooltip: {
        tooltip: {
            fontSize: '1rem',
        },
    },
};
