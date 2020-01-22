import React from 'react';
import {Button, InputLabel,FormControl, FormHelperText } from '@material-ui/core';

const renderFileUploadField = ({ input, label, meta, children, classes, ...custom }) => {
    delete input.value
    return (
        <FormControl error={(meta.touched && meta.error)}>
            <InputLabel htmlFor="age-native-helper">{label}</InputLabel>
            <input
                accept="image/*"
                className={classes.input}
                id="raised-button-file"
                multiple
                {...input}
                style={{ display: 'none' }}
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button raised component="span" >
                    Upload
          </Button>
            </label>
            <FormHelperText>{(meta.touched && meta.error) ? meta.error : ''}</FormHelperText>
        </FormControl>
    );
}


export default renderFileUploadField