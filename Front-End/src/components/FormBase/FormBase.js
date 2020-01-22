import React from 'react';
import util from '../../util/util';
import Validator from '../../util/Validator';
import { Field } from 'redux-form';
import { Grid } from '@material-ui/core';
import RentersCheckBox from '../FormControlls/CheckBox';
import RentersTextField from '../FormControlls/TextField';
import RentersButton from '../FormControlls/Button';
import RentersSelect from '../FormControlls/SelectField';
import RentersFileUpload from '../FormControlls/FileUpload';

const GetField = (field) => {
    let { type, name, variant, id, label, autoFocus } = field,
        newGeneratedField = null;
    switch (type) {
        case util.fieldType.TextField:
            let validation = name === "email" ? [Validator.required, Validator.email] : name === "confirmPassword" ? [Validator.required, Validator.passwordMatch] : [Validator.required];
            let fieldType = name === "password" || name === "confirmPassword" ? { type: "password" } : null
            newGeneratedField = <Field name={name} variant={variant} {...fieldType} fullWidth id={id} label={label} autoFocus={autoFocus} component={RentersTextField} validate={validation} />
            break;
        case util.fieldType.Button:
            newGeneratedField = <Field name={name} fullWidth className="renters-button" variant={variant} component={RentersButton} type="submit" label={label} />
            break;
        default:
            return null;
    }
    return newGeneratedField;
}

const RentersFormBase = (props) => {
    let { fields } = props;
    return (
        <Grid container spacing={2}>
            {
                fields && fields.map(field => (
                    <Grid item xs={field.xs} sm={field.sm}>
                        {GetField(field)}
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default RentersFormBase;