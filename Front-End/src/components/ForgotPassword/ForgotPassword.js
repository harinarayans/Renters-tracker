import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import RentersTextField from '../FormControlls/TextField';
import RentersButton from '../FormControlls/Button';
import Copyright from '../Copyright/Copyright';
import { Avatar, Link, Grid, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { verificationLink, authenticate } from '../../redux/actions/httpRequest';
import { setToast, setLinearProgressBar, setCurrentUser } from '../../redux/actions/index';
import LinearProgressBar from '../ProgressBar/LinearProgressBar';
import Validator from '../../util/Validator';
import util from '../../util/util';
import '../Login/Login.css';


class ForgotPassword extends PureComponent {
    submit = (values) => {
        this.props.dispatch(setLinearProgressBar(true));
        this.props.dispatch(verificationLink.request(values, null, null, (Response) => {
            let { success, message } = Response.data;
            this.props.dispatch(setLinearProgressBar(false));
            this.props.dispatch(setToast({ open: true, message: message, variant: success ? util.toastVariant.success : util.toastVariant.error }));
        }));
    }

    componentWillMount() {
        if (!this.props.currentUser) {
            this.props.dispatch(setLinearProgressBar(true));
            this.props.dispatch(authenticate.request({}, null, null, (res) => {
                let { success, data } = res.data;
                this.props.dispatch(setLinearProgressBar(false));
                if (success) {
                    this.props.dispatch(setCurrentUser(data));
                    this.props.history.push(util.routes.overview);
                }
            }))
        }
        if (this.props.currentUser) {
            this.props.history.push(util.routes.overview);
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
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
                        Account Recovery
        				</Typography>
                    <form onSubmit={handleSubmit(this.submit)} className='login-form'>
                        <Field variant="outlined" required margin="normal" fullWidth name="email" label="Email Address" id="email" autoFocus component={RentersTextField} validate={[Validator.required, Validator.email]} />
                        <Typography component="h1" variant="h6">
                            Get a verification link
        				</Typography>
                        <div>Renters will send a verification link to registered email address.</div>
                        <Field name="submit" className="renters-button" fullWidth variant="contained" component={RentersButton} type="submit" label="Get Recovery Link" />
                        <Grid container >
                            <Grid item xs >
                                <Link href="./" variant="body2" >
                                    Back to login
              						</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

ForgotPassword = reduxForm({
    form: 'forgotPasswordForm'
})(ForgotPassword);

function mapStateToProps(state) {
    let stateOptions = {
        currentUser: state.globalReducer.currentUser
    };
    return stateOptions
}

ForgotPassword = connect(mapStateToProps)(ForgotPassword);
export default ForgotPassword;
