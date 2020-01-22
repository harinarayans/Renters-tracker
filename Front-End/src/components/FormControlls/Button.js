import React from 'react';
import Button from '@material-ui/core/Button';

const rentersButton = ({ type, label, ...custom }) => (
    <Button
        type={type}
        fullWidth
        variant="contained"
        //color="primary"
        {...custom}
    >
        {label}
    </Button>
)

export default rentersButton;