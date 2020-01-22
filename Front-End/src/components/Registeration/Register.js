import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import RentersCheckBox from '../FormControlls/CheckBox';
import RentersTextField from '../FormControlls/TextField';
import RentersButton from '../FormControlls/Button';
import Copyright from '../Copyright/Copyright';
import { Avatar, Link, Grid, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import { HowToRegOutlined } from '@material-ui/icons';
import { connect } from 'react-redux';
import { register, authenticate } from '../../redux/actions/httpRequest';
import LinearProgressBar from '../ProgressBar/LinearProgressBar';
import { setToast, setLinearProgressBar, setCurrentUser } from '../../redux/actions/index';
import Validator from '../../util/Validator';
import util from '../../util/util';
import '../Login/Login.css';


class Register extends PureComponent {
    submit = (values) => {
        this.props.dispatch(setLinearProgressBar(true));
        this.props.dispatch(register.request(values, null, null, (response) => {
            let { success, message } = response.data;
            this.props.dispatch(setLinearProgressBar(false));
            this.props.dispatch(setToast({ open: true, message: message, variant: success ? util.toastVariant.success : util.toastVariant.error }));
        }))
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
            <Container component="main" maxWidth="xs" className='register-container'>
                <LinearProgressBar />
                <CssBaseline />
                <div className="register-paper">
                    <Avatar className="login-avatar">
                        <HowToRegOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Renters
        				</Typography>
                    <form onSubmit={handleSubmit(this.submit)} className='login-form'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Field name="firstName" variant="outlined" fullWidth id="firstName" label="First Name" autoFocus component={RentersTextField} validate={[Validator.required, Validator.string]} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field name="lastName" variant="outlined" fullWidth id="lastName" label="Last Name" component={RentersTextField} validate={[Validator.required, Validator.string]} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field variant="outlined" fullWidth name="email" label="Email Address" id="email" component={RentersTextField} validate={[Validator.required, Validator.email]} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field variant="outlined" fullWidth name="password" label="Password" id="password" type="password" component={RentersTextField} validate={[Validator.required, Validator.password, Validator.disallowSpace]} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field variant="outlined" fullWidth name="confirmPassword" label="Confirm Password" id="confirmPassword" type="password" component={RentersTextField} validate={[Validator.required, Validator.passwordMatch]} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="allowPramotionEmails" value="allowPramotionEmaila" component={RentersCheckBox} label="Receive marketing promotions and updates via email." />
                            </Grid>
                            <Field name="submit" fullWidth className="renters-button" variant="contained" component={RentersButton} type="submit" label="Sign Up" />
                            <Grid container>
                                <Grid item>
                                    <Link href="./" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
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

Register = reduxForm({
    form: 'registerForm'
})(Register);

function mapStateToProps(state) {
    let stateOptions = {
        currentUser: state.globalReducer.currentUser
    };
    return stateOptions
}

Register = connect(mapStateToProps)(Register);
export default Register;
