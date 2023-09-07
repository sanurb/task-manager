import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const token = this.getAccessToken();

    if (!token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(token)) {
      this.setSession(token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(jwtServiceConfig.signUp, data).then((response) => {
            if (response.data.user) {
                this.setSession(response.data.token);
                resolve(response.data.user);
                this.emit('onLogin', response.data.user);
            } else {
                reject(response.data.error);
            }
        });
    });
  };

  signInWithUserAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
        axios
            .post(jwtServiceConfig.signIn, { username, password })
            .then((response) => {
                if (response.data.user) {
                    this.setSession(response.data.token);
                    resolve(response.data.user);
                    this.emit('onLogin', response.data.user);
                } else {
                    console.log(response);
                    reject(response.data.status);
                }
            });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          data: {
            token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.token);
            resolve(response.data.user);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (token) => {
    if (token) {
      localStorage.setItem('jwt_access_token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (token) => {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
