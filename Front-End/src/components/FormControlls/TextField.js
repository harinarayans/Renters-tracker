import React from 'react';
import TextField from '@material-ui/core/TextField';

const rentersTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        label={label}
        helperText={error}
        error={touched && error}
        {...input}
        {...custom}
    />
)

export default rentersTextField;