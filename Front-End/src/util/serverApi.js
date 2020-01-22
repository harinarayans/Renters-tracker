import util from '../util/util';

let baseUrl = util.baseUrl;

export default {
  LOGIN: baseUrl + 'login',
  LOGOUT: baseUrl + 'logout',
  AUTHENTICATE: baseUrl + 'authenticate',
  REGISTER: baseUrl + 'register',
  VERIFICATION: baseUrl + 'verification',
  VERIFICATION_LINK: baseUrl + 'verificationLink',
  RESET_PASSWORD: baseUrl + 'resetPassword',
  USER: baseUrl + 'user'
}