import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const renderCheckbox = ({ input, label, ...custom }) => (
    <FormControlLabel
        control={<Checkbox
            checked={input.value ? true : false}
            value={input.value}
            onChange={(event) => input.onChange(event.target.value)}
            {...input}
            {...custom}
        />}
        label={label}
    />

)

export default renderCheckbox