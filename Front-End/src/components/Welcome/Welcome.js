import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import util from '../../util/util';

const Welcome = (props) => {
    let { screenName, name } = props;
    return (
        <Fragment>
            <Grid container >
                <Grid item xs={12}>
                    <div>{screenName}</div>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                        <b>{util.greetMessage()}{name}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div>Here's what's happening</div>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Welcome;