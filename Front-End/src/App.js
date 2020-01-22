import React, { Fragment } from 'react';
import Login from './components/Login/Login';
import Register from './components/Registeration/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Recovery from './components/PasswordRecovery/Recovery';
import Drawer from './components/Sidebar/Drawer';
import EmailVerification from './components/Verification/EmailVerivication';
import PageNotFound from './components/PageNotFound/PageNotFound';
import RentersSnackbar from './components/Snackbar/ActionableSnackbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import './App.css';
const store = configureStore();

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <RentersSnackbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" name="Login" component={Login} />
            <Route exact path="/register" name="Register" component={Register} />
            <Route exact path="/forgotPassword" name="ForgotPassword" component={ForgotPassword} />
            <Route exact path="/emailVerification/:id" name="EmailVerification" component={EmailVerification} />
            <Route exact path="/recovery/:id" name="Recovery" component={Recovery} />
            <Route path="/" name="Dashboard" component={Drawer} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;