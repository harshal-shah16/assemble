import {Menu, MenuItem, Tooltip, useTheme} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Check, PanTool} from '@material-ui/icons';
import React, {useState} from 'react';

const Resolver = ({
                          handleToggle,
                          status,
                          disableTitle,
                          enableTitle,
                      }) => {

    const [actionAnchor, setActionAnchor] = useState(null);
    const theme = useTheme();

    return (
        <div>
            <Tooltip title={'Change Status'}>
                <IconButton
                    aria-label="Change status"
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={e => setActionAnchor(e.currentTarget)}
                >
                    {status ? <Check
                                style={{
                                    color:
                                    theme.palette.success.main,
                                    fontSize: '2rem'
                                }}/>
                            :
                     <PanTool
                         color="error"/>}
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={actionAnchor}
                keepMounted
                open={Boolean(actionAnchor)}
                onClose={() => setActionAnchor(undefined)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem onClick={() => {
                    handleToggle()
                    setActionAnchor(undefined);
                }}>
                    {status ?
                     <Tooltip title={disableTitle}><PanTool color="error"/></Tooltip>
                            :
                     <Tooltip title={enableTitle}><Check
                         style={{color: theme.palette.success.main, fontSize: '2rem'}}/>
                     </Tooltip>}
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Resolver
