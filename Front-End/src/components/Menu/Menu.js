import React from 'react';
import { ClickAwayListener, Paper, MenuItem, Divider, MenuList } from '@material-ui/core';

const RentersMenuList = (props) => {
    let { menuItem, onClick } = props;
    return (
        <Paper>
            <ClickAwayListener onClickAway={onClick}>
                <MenuList role="menu">
                    {
                        menuItem.map(element => {
                            return (
                                <>
                                    <MenuItem
                                        onClick={element.onClick}
                                        className={element.className}
                                    >
                                        {element.menuName}
                                    </MenuItem>
                                    {element.divider && <Divider light />}
                                </>
                            )
                        })
                    }
                </MenuList>
            </ClickAwayListener>
        </Paper>
    )
}
export default RentersMenuList;