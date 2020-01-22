import React from 'react';
import { Popover } from '@material-ui/core';
const RentersPopover = (props) => {
    let { open, handleClose, anchorEl, children } = props;
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </Popover>
    )
}

export default RentersPopover;