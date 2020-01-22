import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Welcome from '../../components/Welcome/Welcome';
import ListWithIcon from '../../components/List/ListWithIcon';
import './Overview.css';

class Overview extends PureComponent {

    render() {
        let { currentUser } = this.props,
            Name = currentUser ? currentUser.firstName + " " + currentUser.lastName : 'Guest';
        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={5}>
                        <Welcome screenName={"Home"} name={Name} />
                    </Grid>
                    <Grid item xs={7}>

                    </Grid>
                </Grid>
                <Grid container style={{ display: 'flex' }}>
                    <Grid item xs={12} sm={4} lg={4} className='overview-grid'>
                        <Typography variant='h6'><b>230</b></Typography>
                        <Typography>TODAY'S VISITORS</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} className='overview-grid'>
                        <Typography variant='h6'><b>230</b></Typography>
                        <Typography>NEW CLIENTS</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} className='overview-grid'>
                        <Typography variant='h6'><b>$230</b></Typography>
                        <Typography>TODAY REVENUE</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <ListWithIcon />
                </Grid>
            </Fragment >
        )
    }
}

function mapStateToProps(state) {
    let stateOptions = {
        currentUser: state.globalReducer.currentUser
    };
    return stateOptions
}

Overview = connect(mapStateToProps)(Overview);
export default Overview;
