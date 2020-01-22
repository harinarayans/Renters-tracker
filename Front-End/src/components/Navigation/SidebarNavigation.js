import React, { PureComponent } from 'react';
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Routes from '../../routes';
import './SidebarNavigation.css';

const RentersNavLink = (props) => {
    let { route, index } = props;
    if (route.name !== 'PageNotFound') {
        return (
            <NavLink
                to={route.path}
                className='sidebar-nav-link'
                activeClassName="active"
                key={index}
            >
                <ListItem button key={index}>
                    <ListItemIcon><route.icon /></ListItemIcon>
                    <ListItemText primary={route.name} />
                </ListItem>
            </NavLink>
        )
    }
    return null;
}

const MenuWithSubMenu = (props) => {
    let { route, isExpandable, index, open, onClick } = props;
    return (
        <React.Fragment>
            <ListItem button onClick={() => onClick(index)}>
                {route.icon && <ListItemIcon><route.icon /></ListItemIcon>}
                <ListItemText
                    primary={route.name}
                />
                {isExpandable && !open && <IconExpandMore />}
                {isExpandable && open && <IconExpandLess />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List disablePadding>
                    {route.children.map((subRoute, index) => (
                        <RentersNavLink route={subRoute} index={index} />
                    ))}
                </List>
                <Divider />
            </Collapse>
        </React.Fragment>
    )
}

class SidebarNavigation extends PureComponent {
    handleClick = (index) => {
        let state = this.state;
        if (state && Object.entries(state).length > 0) {
            this.setState(Object.assign(...Object.keys(state).map(k => ({ [k]: index === k ? state[k] : false }))), () => {
                this.setState({ [index]: state.hasOwnProperty(index) ? !state[index] : true });
            });
        } else {
            this.setState({ [index]: state && state.hasOwnProperty(index) ? !state[index] : true });
        }
    }

    render() {
        return (
            <List>
                {
                    Routes.map((prop, key) => {
                        let { children } = prop,
                            isExpandable = children && children.length > 0;

                        if (this.state && Object.entries(this.state).length > 0 && this.state.hasOwnProperty(key))
                            var open = this.state[key];
                        return (
                            <React.Fragment>
                                {
                                    isExpandable ?
                                        <MenuWithSubMenu route={prop} isExpandable={isExpandable} index={key} open={open} onClick={this.handleClick} /> :
                                        <RentersNavLink route={prop} index={key} />
                                }
                            </React.Fragment>
                        )
                    })
                }
            </List>
        )
    }
}

export default SidebarNavigation;

