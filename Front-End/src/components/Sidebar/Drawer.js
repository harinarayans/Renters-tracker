import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Divider, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '../AppBar/AppBar';
import SidebarNavigation from '../Navigation/SidebarNavigation';
import util from '../../util/util';
import { setCurrentUser } from '../../redux/actions/index';
import { authenticate } from '../../redux/actions/httpRequest';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#F0F4F5',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        backgroundColor: '#F0F4F5',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    brand: {
        marginRight: 40,
        color: '#E3714D',
        fontWeight: 'bold'
    }
}));


const switchRoutes = (
    <Switch>
        {util.generateRoutes().map((prop, key) => {
            if (prop.component) {
                return (
                    <Route
                        path={prop.path}
                        name={prop.name}
                        component={prop.component}
                        key={key}
                        exact
                    />
                );
            } else {
                return null;
            }
        })}
        <Redirect from="/" to="/pageNotFound" />
    </Switch>
);

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { currentUser } = useSelector(state => ({
        currentUser: state.globalReducer.currentUser
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) {
            dispatch(authenticate.request({}, null, null, (res) => {
                let { success, data } = res.data;
                if (!success) {
                    history.push(util.routes.login)
                }
                dispatch(setCurrentUser(data))
            }))
        }
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {currentUser &&
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbar}>
                            <Typography variant='h6' className={classes.brand}>Renters</Typography>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <SidebarNavigation />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {switchRoutes}
                    </main>
                </div>
            }
        </>
    );
}
