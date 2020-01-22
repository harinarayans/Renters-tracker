import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { verification } from '../../redux/actions/httpRequest';
import { Link, Grid, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import Copyright from '../Copyright/Copyright';
import { setToast } from '../../redux/actions/index';
import util from '../../util/util';
import '../Login/Login.css';


class EmailVerification extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            verificationSuccess: false
        }
    }
    componentWillMount() {
        const secretKey = this.props.match.params.id || null;
        if (secretKey) {
            this.props.dispatch(verification.request({ secretKey: secretKey }, null, null, (response) => {
                let { success, message } = response.data;
                if (success) {
                    this.setState({ verificationSuccess: true });
                } else {
                    this.props.dispatch(setToast({ open: true, message: message, variant: util.toastVariant.error }));
                }
            }));
        }
    }

    render() {
        const { verificationSuccess } = this.state;
        return (
            <React.Fragment>
                {verificationSuccess ?
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="login-paper">
                            <Typography component="h1" variant="h6">
                                Email verified succesfully.
        				</Typography>
                            <Grid container >
                                <Grid item xs >
                                    <Link href="/" variant="body2" >
                                        Login
              						</Link>
                                </Grid>
                            </Grid>
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

function mapStateToProps(state) {
    let stateOptions = {
        currentUser: state.currentUser
    };
    return stateOptions
}

EmailVerification = connect(mapStateToProps)(EmailVerification);
export default EmailVerification;
