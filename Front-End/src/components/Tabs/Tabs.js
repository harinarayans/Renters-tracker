import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import util from '../../util/util';
import { Notifications, Settings, Subscriptions, Security } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import SecuritySettings from '../Settings/Security';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const actvateTab = (path) => {
  let activeTab = null;
  switch (path) {
    case util.routes.generalSettings:
      activeTab = 0
      break;
    case util.routes.notificationSettings:
      activeTab = 1
      break;
    case util.routes.subscriptionSettings:
      activeTab = 2
      break;
    case util.routes.securitySettings:
      activeTab = 3
      break;
    default:
      break;
  }
  return activeTab;
}

const pushActiveRoute = (value, history) => {
  switch (value) {
    case 0:
      history.push(util.routes.generalSettings);
      break;
    case 1:
      history.push(util.routes.notificationSettings);
      break;
    case 2:
      history.push(util.routes.subscriptionSettings);
      break;
    case 3:
      history.push(util.routes.securitySettings);
      break;
    default:
      break;
  }
}
export default function TabsWrappedLabel(props) {
  const { path } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(actvateTab(path));
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    pushActiveRoute(newValue, history);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab label="General" icon={<Settings />} wrapped {...a11yProps(0)} />
          <Tab label="Notification" icon={<Notifications />} {...a11yProps(1)} />
          <Tab label="Subscription" icon={<Subscriptions />} {...a11yProps(2)} />
          <Tab label="Security" icon={<Security />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SecuritySettings />
      </TabPanel>
    </div>
  );
}
