import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import RentersCheckBox from '../FormControlls/CheckBox';
import RentersTextField from '../FormControlls/TextField';
import RentersButton from '../FormControlls/Button';
import Copyright from '../Copyright/Copyright';
import { Avatar, Link, Grid, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { login, authenticate } from '../../redux/actions/httpRequest';
import { setToast, setCurrentUser, setLinearProgressBar } from '../../redux/actions/index';
import LinearProgressBar from '../ProgressBar/LinearProgressBar';
import Validator from '../../util/Validator';
import util from '../../util/util';
import './Login.css';


class Login extends PureComponent {
	submit = (values) => {
		this.props.dispatch(setLinearProgressBar(true));
		this.props.dispatch(login.request(values, null, null, (response) => {
			let { success, message, data } = response.data;
			this.props.dispatch(setLinearProgressBar(false));
			if (success) {
				this.props.dispatch(setCurrentUser(data));
				this.props.history.push(util.routes.overview);
			} else {
				this.props.dispatch(setToast({ open: true, message: message, variant: util.toastVariant.error }));
			}
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
					<form onSubmit={handleSubmit(this.submit)} className='login-form'>
						<Field variant="outlined" required margin="normal" fullWidth name="email" label="Email Address" id="email" autoFocus component={RentersTextField} validate={[Validator.required, Validator.email]} />
						<Field variant="outlined" required margin="normal" fullWidth name="password" label="Password" id="password" type="password" component={RentersTextField} validate={[Validator.required]} />
						<Field name="rememberMe" component={RentersCheckBox} label="Remember Me" />
						<Field name="submit" className="renters-button" fullWidth variant="contained" component={RentersButton} type="submit" label="Sign In" />
						<Grid container>
							<Grid item xs>
								<Link href="/forgotPassword" variant="body2">
									Forgot password?
              						</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
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

Login = reduxForm({
	form: 'loginForm'
})(Login);

function mapStateToProps(state) {
	let stateOptions = {
		currentUser: state.globalReducer.currentUser
	};
	return stateOptions
}

Login = connect(mapStateToProps)(Login);
export default Login;
