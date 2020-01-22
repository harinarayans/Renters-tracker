import FetchApi from '../../util/axiosApi';
import Api from '../../util/serverApi';

export let login = new FetchApi({
  requestType: 'LOGIN',
  url: Api.LOGIN
});

export let authenticate = new FetchApi({
  requestType: 'AUTHENTICATE',
  url: Api.AUTHENTICATE
});

export let logout = new FetchApi({
  requestType: 'LOGOUT',
  url: Api.LOGOUT
});

export let register = new FetchApi({
  requestType: 'REGISTER',
  url: Api.REGISTER
});

export let verification = new FetchApi({
  requestType: 'VERIFICATION',
  url: Api.VERIFICATION
});

export let verificationLink = new FetchApi({
  requestType: 'VERIFICATION_LINK',
  url: Api.VERIFICATION_LINK
});

export let resetPassword = new FetchApi({
  requestType: 'RESET_PASSWORD',
  url: Api.RESET_PASSWORD
});

export let user = new FetchApi({
  requestType: 'USER',
  url: Api.USER
});