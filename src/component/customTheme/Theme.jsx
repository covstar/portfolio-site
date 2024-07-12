export const theme = {
    palette: {
        // ...
        typography: {
            fontFamily: 'Oswald'
        },
    },
    components: {
        // ... 
       
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    // invisible border when not active, to avoid position flashs
                    columnGap: '5px',
                    color: '#171717 !important',
                    fontWeight: '500 !important',
                    fontSize: '18px ',
                    borderLeft: '3px solid transparent',
                    minHeight: '50px !important',
                    padding: '16px 16px !important',
                    filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
                    '&.RaMenuItemLink-active': {
                        borderRight: '5px solid #171717',
                        fontWeight: '600 !important',
                        background: '#d7d7d7'
                    },
                    '& .RaMenuItemLink-icon': {
                        color: '#171717',
                        // minWidth: 'auto !important'
                    },
                   
                },
            },
        },
    },
};