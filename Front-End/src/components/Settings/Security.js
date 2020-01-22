import React, { PureComponent, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import util from '../../util/util';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import { Security } from '@material-ui/icons';
import RentersFormBase from '../FormBase/FormBase';

class ChangePassword extends PureComponent {
    submit = (values) => {
        debugger
    }

    render() {
        const { handleSubmit } = this.props,
            fields = [
                { name: "password", id: 'password', label: 'Password', autoFocus: true, type: util.fieldType.TextField, variant: 'outlined', xs: 6, sm: 6 },
                { name: "confirmPassword", id: 'confirmPassword', label: 'Confirm Password', type: util.fieldType.TextField, variant: 'outlined', xs: 6, sm: 6 },
                { name: "saveChange", id: 'saveChange', label: 'Save Change', type: util.fieldType.Button, variant: 'contained', xs: 3, sm: 3 }
            ];
        return (
            <form onSubmit={handleSubmit(this.submit)} className='login-form'>
                <RentersFormBase fields={fields} />
            </form>
        )
    }
}

ChangePassword = reduxForm({
    form: 'changePasswordForm'
})(ChangePassword);

function mapStateToProps(state) {
    let stateOptions = {
        currentUser: state.currentUser
    };
    return stateOptions
}

connect(mapStateToProps)(ChangePassword);


class RentersSecurity extends PureComponent {
    render() {
        return (
            <Fragment>
                <Card
                    isCardHeader={true}
                    isCardHeaderIcon={true}
                    isCardContent={true}
                    isHeaderDivider={true}
                    cardHeaderIcon={Security}
                    title={"Security"}
                    subTitle={"Change Password"}
                    cardContent={ChangePassword}
                />
            </Fragment>
        )
    }
}

export default RentersSecurity;