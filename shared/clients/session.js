import http from "./http";

/**
 * The client that manages sessions, via interacting with our backend.
 */
class Session {

  /**
   * Sends the user an email containing a login link back to the community group management form. This is meant for
   * Community Group leaders to be able to manage their groups.
   *
   * @param {string} email 
   */
  async sendEmailLink (email) {
    const { data } = await http.post(`/email_login_link`, { email });
    return data;
  }

  /**
   * The login link generates a one-time-use token that must be exchanged for a JSON Web Token (JWT). The JWT is used
   * as the authentication header.
   *
   * @param {string} token  The one-time-use token
   */
  async login (token) {
    if (!token) {
      return Promise.reject(new Error('Token not found'));
    }
    const { data } = await http.put(`/login`, { token });
    localStorage.setItem('jwt', data.jwt);
  }

  /**
   * Return the current user. This returns successfully if:
   * 1. There is a JSON Web Token present in localStorage
   * 2. The JWT is valid (not expired, signed correctly, not malformed)
   */
  async getMe () {
    const { data } = await http.get('/me');
    return data;
  }

  async getConfigs () {
    const { data } = await http.get('/configs');
    return data;
  }
}

export default new Session();
