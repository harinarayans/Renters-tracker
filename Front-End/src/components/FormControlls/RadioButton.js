import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup'

const rentersRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
        {...input}
        {...rest}
        value={input.value}
        onChange={(event) => input.onChange(event.target.value)}
    />
)

export default rentersRadioGroup;