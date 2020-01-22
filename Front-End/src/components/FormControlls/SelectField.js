import React from 'react';
import { Select } from '@material-ui/core';

const renderSelectField = ({ input, label, id, meta: { touched, error }, children, ...custom }) => (
    <Select
        labelId={id}
        error={touched && error}
        {...input}
        onChange={(event, child) => {
            input.onChange(event.target.value)
        }}
        children={children}
        {...custom}
    />
)

export default renderSelectField;