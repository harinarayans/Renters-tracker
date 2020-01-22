import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import RentersTextField from '../FormControlls/TextField';
import RentersButton from '../FormControlls/Button';
import Copyright from '../Copyright/Copyright';
import { Avatar, Grid, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { verification, resetPassword } from '../../redux/actions/httpRequest';
import { setToast, setLinearProgressBar } from '../../redux/actions/index';
import LinearProgressBar from '../ProgressBar/LinearProgressBar';
import Validator from '../../util/Validator';
import util from '../../util/util';
import '../Login/Login.css';


class Recovery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            verificationSuccess: false,
            email: null
        }
    }

    submit = (values) => {
        values.email = this.state.email;
        this.props.dispatch(setLinearProgressBar(true));
        this.props.dispatch(resetPassword.request(values, null, null, (response) => {
            let { success, message } = response.data;
            this.props.dispatch(setLinearProgressBar(false));
            this.props.dispatch(setToast({ open: true, message: message, variant: success ? util.toastVariant.success : util.toastVariant.error }));
            this.props.history.push('/');
        }));
    }

    componentWillMount() {
        const secretKey = this.props.match.params.id || null;
        if (secretKey) {
            this.props.dispatch(verification.request({ secretKey: secretKey, comingFrom: "recovery" }, null, null, (response) => {
                let { success, message, data } = response.data;
                if (success) {
                    this.setState({ verificationSuccess: true, email: data.email });
                } else {
                    this.props.dispatch(setToast({ open: true, message: message, variant: success ? 'success' : 'error' }));
                }
            }));
        }
    }

    render() {
        const { handleSubmit } = this.props;
        let { verificationSuccess } = this.state;
        return (
            <React.Fragment>
                {verificationSuccess ?
                    <Container component="main" maxWidth="xs" className='login-container'>
                        <LinearProgressBar />
                        <CssBaseline />
                        <div className="login-paper">
                            <Avatar className="login-avatar">
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Renters
        				</Typography>
                            <Typography component="h1" variant="h6">
                                Account Reset
        				</Typography>
                            <form onSubmit={handleSubmit(this.submit)} className='login-form'>
                                <Grid item xs={12}>
                                    <Field variant="outlined" margin='normal' fullWidth autoFocus name="password" label="New Password" id="password" type="password" component={RentersTextField} validate={[Validator.required, Validator.password]} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field variant="outlined" margin='normal' fullWidth name="confirmPassword" label="Confirm Password" id="confirmPassword" type="password" component={RentersTextField} validate={[Validator.required, Validator.passwordMatch]} />
                                </Grid>
                                <Field name="submit" className="renters-button" fullWidth variant="contained" component={RentersButton} type="submit" label="Reset" />
                            </form>
                        </div>
                        <Box mt={8}>
                            <Copyright />
                        </Box>
                    </Container> : null
                }
            </React.Fragment>
        );
    }
}

Recovery = reduxForm({
    form: 'recoveryForm'
})(Recovery);

function mapStateToProps(state) {
    let stateOptions = {
        verification: state.verification
    };
    return stateOptions
}

Recovery = connect(mapStateToProps)(Recovery);
export default Recovery;
